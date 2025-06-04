import { DndContext } from '@dnd-kit/core';
import { DropZone, type ComponentInstance } from './components/DropZone';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SidebarComponents from './components/SidebarComponents';
import SidebarPrimary from './components/SidebarPrimary';

const items = ['button', 'textfield', 'checkbox', 'appbar1', 'iconUser', 'iconSearch', 'iconLock', 'iconMenuDeep'];

const defaultProperties: Record<string, ComponentInstance['properties']> = {
  button: { label: 'Botón', color: 'cyan-500', width: 128, height: 32 },
  textfield: { placeholder: 'Campo de texto', width: 232, height: 32 },
  checkbox: { checked: false },
  appbar1: { width: 300, height: 32 },
};

export default function App() {
  const [components, setComponents] = useState<ComponentInstance[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  function handleDragEnd(event: any) {
    const { over, active, delta } = event;

    const isNewComponent = items.includes(active.id);
    if (isNewComponent && over?.id === 'dropzone') {
      setComponents((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: active.id,
          x: 50,
          y: 50,
          properties: defaultProperties[active.id] || {},
        },
      ]);
    }

    if (!isNewComponent) {
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

  function updatePosition(id: string, x: number, y: number) {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, x, y } : comp))
    );
  }

  function updateComponentProperties(id: string, properties: ComponentInstance['properties']) {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, properties } : comp))
    );
  }

  const selectedComponent = components.find((comp) => comp.id === selectedComponentId) || null;

  return (
    <div className="flex">
      <DndContext onDragEnd={handleDragEnd}>
        <SidebarComponents />
        <div className="flex w-full">
          <DropZone
            components={components}
            updatePosition={updatePosition}
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
          />
          <SidebarPrimary
            selectedComponent={selectedComponent}
            updateComponentProperties={updateComponentProperties}
          />
        </div>
      </DndContext>
    </div>
  );
}