import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function DraggableInsidePhone({
  id,
  x,
  y,
  children,
  isSelected,
  onSelect,
}: {
  id: string;
  x: number;
  y: number;
  children: React.ReactNode;
  updatePosition: (id: string, x: number, y: number) => void;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    position: 'absolute' as const,
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
    touchAction: 'none',
    zIndex: isDragging ? 1000 : 1,
    border: isSelected ? '2px solid blue' : 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation(); // Prevent deselecting when clicking component
        onSelect();
      }}
    >
      {children}
    </div>
  );
}