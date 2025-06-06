import { SignedIn, UserButton } from '@clerk/clerk-react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatbotSidebar from './components/chatbot/ChatbotSidebar';
import { DropZone } from './components/DropZone';
import { ScreenManager } from './components/ScreenManager';
import SidebarComponents from './components/SidebarComponents';
import SidebarPrimary from './components/SidebarPrimary';
import type { ComponentInstance, ScreenType } from './types/CanvasItem';
import { data, header } from './components/library/Table';

const items = ['button', 'textfield', 'checkbox', 'appbar1',
   'iconUser', 'iconSearch', 'iconLock', 'iconMenuDeep','table'];

const defaultProperties: Record<string, ComponentInstance['properties']> = {
  button: { label: 'Botón', bg: '#45def2', width: 128, height: 32, borderRadius: 12, fontSize: 16 },
  textfield: { placeholder: 'Campo de texto', width: 232, height: 32, borderRadius: 12 },
  checkbox: { checked: false },
  appbar1: { width: 300, height: 32, bg: '#ffffff' },
  table: { header, data }
};

export default function App() {
  const [screens, setScreens] = useState<ScreenType[]>(() => {
    const saved = localStorage.getItem('design-screens');
    return saved ? JSON.parse(saved) : [
      {
        id: 'home',
        name: 'Pantalla Principal',
        components: []
      }
    ];
  });

  const [currentScreenId, setCurrentScreenId] = useState('home');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [history, setHistory] = useState<ScreenType[][]>([screens]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const currentScreen = screens.find(screen => screen.id === currentScreenId) || screens[0];

  // Guardar pantallas en localStorage
  useEffect(() => {
    localStorage.setItem('design-screens', JSON.stringify(screens));
  }, [screens]);

  // Función para actualizar las pantallas desde un JSON
  const updateScreensFromJSON = (newScreens: ScreenType[]) => {
    // Limpiar localStorage
    localStorage.removeItem('design-screens');
    setScreens(newScreens);
    setHistory([newScreens]);
    setHistoryIndex(0);
    setCurrentScreenId(newScreens[0]?.id || 'home');
    setSelectedComponentId(null);
    localStorage.setItem('design-screens', JSON.stringify(newScreens));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { over, active, delta } = event;

    const isNewComponent = items.includes(active.id as string);
    if (isNewComponent && over?.id === 'dropzone') {
      const newScreens = screens.map(screen => {
        if (screen.id === currentScreenId) {
          return {
            ...screen,
            components: [
              ...screen.components,
              {
                id: uuidv4(),
                type: active.id as string,
                x: 50,
                y: 50,
                properties: defaultProperties[active.id as string] || {},
              }
            ]
          };
        }
        return screen;
      });
      saveHistory(newScreens);
    } else if (!isNewComponent) {
      const newScreens = screens.map(screen => {
        if (screen.id === currentScreenId) {
          return {
            ...screen,
            components: screen.components.map(comp =>
              comp.id === active.id
                ? {
                  ...comp,
                  x: comp.x + delta.x,
                  y: comp.y + delta.y,
                }
                : comp
            )
          };
        }
        return screen;
      });
      saveHistory(newScreens);
    }
  }

  function saveHistory(newScreens: ScreenType[]) {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newScreens);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setScreens(newScreens);
  }

  function updateComponentProperties(id: string, properties: ComponentInstance['properties']) {
    const newScreens = screens.map(screen => {
      if (screen.id === currentScreenId) {
        return {
          ...screen,
          components: screen.components.map(comp =>
            comp.id === id ? { ...comp, properties } : comp
          )
        };
      }
      return screen;
    });
    saveHistory(newScreens);
  }

  function deleteComponent(id: string) {
    const newScreens = screens.map(screen => {
      if (screen.id === currentScreenId) {
        return {
          ...screen,
          components: screen.components.filter(comp => comp.id !== id)
        };
      }
      return screen;
    });
    saveHistory(newScreens);
    if (selectedComponentId === id) setSelectedComponentId(null);
  }

  function duplicateComponent(id: string) {
    const newScreens = screens.map(screen => {
      if (screen.id === currentScreenId) {
        const component = screen.components.find(comp => comp.id === id);
        if (component) {
          return {
            ...screen,
            components: [
              ...screen.components,
              {
                ...component,
                id: uuidv4(),
                x: component.x + 20,
                y: component.y + 20
              }
            ]
          };
        }
      }
      return screen;
    });
    saveHistory(newScreens);
  }

  function undo() {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setScreens(history[newIndex]);
    }
  }

  function redo() {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setScreens(history[newIndex]);
    }
  }

  function exportDesign() {
    const json = JSON.stringify(screens, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const selectedComponent = currentScreen.components.find(comp => comp.id === selectedComponentId) || null;

  const createNewScreen = () => {
    const newScreenId = uuidv4();
    const newScreens = [
      ...screens,
      {
        id: newScreenId,
        name: `Pantalla ${screens.length + 1}`,
        components: []
      }
    ];
    saveHistory(newScreens);
    setCurrentScreenId(newScreenId);
  };

  const navigateToScreen = (screenId: string) => {
    if (screens.some(screen => screen.id === screenId)) {
      setCurrentScreenId(screenId);
      setSelectedComponentId(null); // Deseleccionar al navegar
    }
  };

  const renameScreen = (id: string, newName: string) => {
    const newScreens = screens.map(screen => {
      if (screen.id === id) {
        return {
          ...screen,
          name: newName
        };
      }
      return screen;
    });
    saveHistory(newScreens);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen">
          <ScreenManager
            screens={screens}
            currentScreenId={currentScreenId}
            setCurrentScreenId={setCurrentScreenId}
            onCreateNewScreen={createNewScreen}
            onRenameScreen={renameScreen}
          />
          <SidebarComponents />
        </div>
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
              components={currentScreen.components}
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
              navigateToScreen={navigateToScreen}
            />
            <SidebarPrimary
              selectedComponent={selectedComponent}
              updateComponentProperties={updateComponentProperties}
              deleteComponent={deleteComponent}
              duplicateComponent={duplicateComponent}
              screens={screens}
              currentScreenId={currentScreenId}
            />
          </div>
        </div>
        <ChatbotSidebar
          updateScreensFromJSON={updateScreensFromJSON}
        />
      </DndContext>
    </div>
  );
}