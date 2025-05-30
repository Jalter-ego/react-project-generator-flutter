// App.tsx
import { DndContext } from '@dnd-kit/core';
import { DropZone, type ComponentInstance } from './components/DropZone';
import { Draggable } from './components/Draggable';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppBar1, Button, Checkbox, TextField } from './components/ComponentLibrary';
import { IconLock, IconMenuDeep, IconSearch, IconUser } from './assets/Icons';

const items = ["button", "textfield", "checkbox", "appbar1",
   "iconUser", "iconSearch", "iconLock","iconMenuDeep"];
const icons = [
  {
    name: "iconUser",
    icon: IconUser
  },
  {
    name: "iconSearch",
    icon: IconSearch
  },
  {
    name: "iconLock",
    icon: IconLock
  },
  {
    name: "iconMenuDeep",
    icon: IconMenuDeep
  }
];


export default function App() {
  const [components, setComponents] = useState<ComponentInstance[]>([]);

  function handleDragEnd(event: any) {
    const { over, active, delta } = event;

    const isNewComponent = items.includes(active.id);
    // Si es uno nuevo,se agrega si no pa fuera
    if (isNewComponent && over?.id === 'dropzone') {
      setComponents(prev => [
        ...prev,
        {
          id: uuidv4(),
          type: active.id,
          x: 50,
          y: 50,
        },
      ]);
    }

    // Si ya esta, cambia su posicion nomas
    if (!isNewComponent) {
      setComponents(prev =>
        prev.map(comp =>
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
    setComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, x, y } : comp
      )
    );
  }

  return (
    <div className="flex">
      <DndContext onDragEnd={handleDragEnd}>
        <aside className="w-[250px] h-screen bg-[#1f1f1f] flex flex-col py-6 gap-4 border-r border-zinc-700 shadow-lg">

          <header className='border-b border-zinc-600 w-full flex px-2 pb-3'>
            <h1 className='font-semibold text-[14px]'>Componentes</h1>
          </header>

          <nav className="flex flex-col gap-2 px-2">
            <Draggable id="button" label="Botón"><Button /></Draggable>
            <Draggable id="textfield" label="Campo de texto"><TextField /></Draggable>
            <Draggable id="checkbox" label="Checkbox"><Checkbox /></Draggable>
            <Draggable id="appbar1" label="AppBar"><AppBar1 /></Draggable>
          </nav>

          {/* Sección de íconos en grid */}
          <div className="px-2">
            <h2 className="text-xs font-semibold text-zinc-400 mb-2">Iconos</h2>
            <div className="grid grid-cols-3 gap-2">
              {icons.map((Icon) => (
                <Draggable key={Icon.name} id={Icon.name} label={Icon.name}>
                  <Icon.icon />
                </Draggable>
              ))}
            </div>
          </div>
        </aside>


        <DropZone components={components} updatePosition={updatePosition} />
      </DndContext>
    </div>
  );
}
