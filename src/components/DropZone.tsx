import { useDroppable } from '@dnd-kit/core';
import { componentMap } from './ComponentLibrary';
import { DraggableInsidePhone } from './DraggableInsidePhone';
import { IconBatery, IconSignal, IconWifi } from '../assets/Icons';

export type ComponentInstance = {
  id: string;
  type: string;
  x: number;
  y: number;
  properties?: {
    label?: string;
    color?: string;
    width?: number;
    height?: number;
    placeholder?: string; // For TextField
    checked?: boolean; // For Checkbox
  };
};

export function DropZone({
  components,
  updatePosition,
  selectedComponentId,
  setSelectedComponentId,
}: {
  components: ComponentInstance[];
  updatePosition: (id: string, x: number, y: number) => void;
  selectedComponentId: string | null;
  setSelectedComponentId: (id: string | null) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: 'dropzone' });

  return (
    <div className="w-full min-h-full flex items-center justify-center bg-[#333333]">
      <div
        ref={setNodeRef}
        className={`bg-white border-[10px] border-black rounded-[2rem] w-[320px] h-[650px]
        grid grid-rows-[auto_1fr_auto] overflow-hidden relative shadow-2xl transition-all duration-200 ${
          isOver ? 'ring-4 ring-blue-400' : ''
        }`}
      >
        <header className="h-6 flex items-center justify-between px-4 text-zinc-800">
          <p className="text-[10px]">12:00</p>
          <div className="ml-10 w-4 h-4 rounded-full bg-zinc-800" />
          <section className="flex items-center">
            <IconWifi d={20} />
            <IconSignal d={20} />
            <IconBatery d={20} />
          </section>
        </header>

        <main
          className="bg-white w-full h-full relative 
          bg-[linear-gradient(#eeefff_1px,transparent_1px),linear-gradient(90deg,#eeefff_1px,transparent_1px)]
          bg-[size:20px_20px] text-zinc-800"
        >
          {components.map((comp) => {
            const Component = componentMap[comp.type];
            return Component ? (
              <DraggableInsidePhone
                key={comp.id}
                id={comp.id}
                x={comp.x}
                y={comp.y}
                updatePosition={updatePosition}
                isSelected={selectedComponentId === comp.id}
                onSelect={() => setSelectedComponentId(comp.id)}
              >
                <Component {...comp.properties} />
              </DraggableInsidePhone>
            ) : null;
          })}
        </main>

        <footer className="h-10 flex items-center justify-center bg-white">
          <div className="w-24 h-1.5 rounded-full bg-zinc-400" />
        </footer>
      </div>
    </div>
  );
}