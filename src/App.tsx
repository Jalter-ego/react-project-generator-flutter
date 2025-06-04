import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { DropZone, type ComponentInstance } from './components/DropZone';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SidebarComponents from './components/SidebarComponents';
import SidebarPrimary from './components/SidebarPrimary';
import { SignedIn, UserButton } from '@clerk/clerk-react';

const items = ['button', 'textfield', 'checkbox', 'appbar1', 'iconUser', 'iconSearch', 'iconLock', 'iconMenuDeep'];

const defaultProperties: Record<string, ComponentInstance['properties']> = {
  button: { label: 'Botón', bg: '#45def2', width: 128, height: 32, borderRadius: 12, fontSize: 16 },
  textfield: { placeholder: 'Campo de texto', width: 232, height: 32, borderRadius: 12 },
  checkbox: { checked: false },
  appbar1: { width: 300, height: 32, bg: '#ffffff' },
};

export default function App() {
  const [components, setComponents] = useState<ComponentInstance[]>(() => {
    const saved = localStorage.getItem('design-components');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [history, setHistory] = useState<ComponentInstance[][]>([components]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Guardar componentes en localStorage
  useEffect(() => {
    localStorage.setItem('design-components', JSON.stringify(components));
  }, [components]);

  // Guardar historial
  const saveHistory = (newComponents: ComponentInstance[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newComponents);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setComponents(newComponents);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { over, active, delta } = event;

    const isNewComponent = items.includes(active.id as string);
    if (isNewComponent && over?.id === 'dropzone') {
      const newComponents = [
        ...components,
        {
          id: uuidv4(),
          type: active.id as string,
          x: 50,
          y: 50,
          properties: defaultProperties[active.id as string] || {},
        },
      ];
      saveHistory(newComponents);
    } else {
      console.log(`Moving component ${active.id} to new position`);
      console.log(`Delta: x=${delta.x}, y=${delta.y}`);


      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === active.id
            ? {
              ...comp,
              x: comp.x + delta.x,
              y: comp.y + delta.y,
            }
            : comp
        )
      );
    }
  }

  function updateComponentProperties(id: string, properties: ComponentInstance['properties']) {
    const newComponents = components.map((comp) =>
      comp.id === id ? { ...comp, properties } : comp
    );
    saveHistory(newComponents);
  }

  function deleteComponent(id: string) {
    const newComponents = components.filter((comp) => comp.id !== id);
    saveHistory(newComponents);
    if (selectedComponentId === id) setSelectedComponentId(null);
  }

  function duplicateComponent(id: string) {
    const component = components.find((comp) => comp.id === id);
    if (component) {
      const newComponents = [
        ...components,
        { ...component, id: uuidv4(), x: component.x + 20, y: component.y + 20 },
      ];
      saveHistory(newComponents);
    }
  }

  function undo() {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setComponents(history[historyIndex - 1]);
    }
  }

  function redo() {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setComponents(history[historyIndex + 1]);
    }
  }

  function exportDesign() {
    const json = JSON.stringify(components, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const selectedComponent = components.find((comp) => comp.id === selectedComponentId) || null;

  return (
    <div className="flex h-screen bg-gray-900">
      <DndContext onDragEnd={handleDragEnd}>
        <SidebarComponents />
        <div className="flex flex-col flex-1">
          <div className="bg-[#1f1f1f] p-3 flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={undo}
                disabled={historyIndex === 0}
                className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:bg-gray-600 hover:bg-blue-600 transition-colors"
              >
                Undo
              </button>
              <button
                onClick={redo}
                disabled={historyIndex === history.length - 1}
                className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:bg-gray-600 hover:bg-blue-600 transition-colors"
              >
                Redo
              </button>
              <button
                onClick={exportDesign}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Export JSON
              </button>
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <div className="flex flex-1">
            <DropZone
              components={components}
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
            />
            <SidebarPrimary
              selectedComponent={selectedComponent}
              updateComponentProperties={updateComponentProperties}
              deleteComponent={deleteComponent}
              duplicateComponent={duplicateComponent}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
}