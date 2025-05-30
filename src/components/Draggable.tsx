// components/Draggable.tsx
import { useDraggable } from '@dnd-kit/core';
//import { CSS } from '@dnd-kit/utilities';

export function Draggable({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  const style = {
    //transform: CSS.Transform.toString(transform),
    cursor: 'pointer',
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="rounded-lg bg-zinc-900 hover:bg-zinc-800 transition p-3 shadow border border-zinc-700 cursor-pointer"
    >
      <div className="bg-white text-black rounded-md p-2 flex justify-center items-center mb-1">
        {children}
      </div>
      <p className="text-xs text-center text-zinc-300 group-hover:text-white
        ">
        {label}
      </p>
    </div>
  );
}
