// components/Draggable.tsx
import { useDraggable } from '@dnd-kit/core';
//import { CSS } from '@dnd-kit/utilities';

export function Draggable({ id, label, children, section }:
  { id: string; label: string; children: React.ReactNode; section: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  const style = {
    //transform: CSS.Transform.toString(transform),
    cursor: 'pointer',
  };

  return (
    <>
      {section === "icons" ? (
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
          <p className="text-xs text-zinc-300 truncate">{label}</p>

        </div>
      ) : (
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          className="rounded-lg border border-zinc-700 transition p-1 shadow cursor-pointer w-full"
        >
            {children}

        </div>
      )

      }
    </>
  );
}
