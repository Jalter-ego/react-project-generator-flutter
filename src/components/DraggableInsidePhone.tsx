import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';

export function DraggableInsidePhone({
  id,
  x,
  y,
  children,
  isSelected,
  onSelect,
  navigateToScreen
}: {
  id: string;
  x: number;
  y: number;
  children: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
  navigateToScreen?: (screenId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const [isClicking, setIsClicking] = useState(false);
  const [clickTimeout, setClickTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicking(true);
    const timeout = setTimeout(() => {
      setIsClicking(false);
    }, 200);
    setClickTimeout(timeout);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isClicking) {
      onSelect();
    }
    setIsClicking(false);
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
  };

  useEffect(() => {
    return () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
    };
  }, [clickTimeout]);

  const style = {
    position: 'absolute' as const,
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
    touchAction: 'none',
    zIndex: isSelected || isDragging ? 1000 : 1,
    border: isSelected ? '2px solid #3b82f6' : 'none',
    cursor: isDragging ? 'grabbing' : 'pointer',
  };
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      const props = child.props as { navigateTo?: string };
      if (props.navigateTo) {
        return React.cloneElement(child, {
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            if (navigateToScreen && props.navigateTo) {
              navigateToScreen(props.navigateTo);
            }
          },
          style: { cursor: 'pointer' }
        } as Partial<unknown> & React.Attributes);
      }
    }
    return child;
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="group relative"
    >
      {childrenWithProps}
      {isSelected && (
        <div className="absolute -top-6 left-0 text-xs bg-blue-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          ID: {id.slice(0, 8)}
        </div>
      )}
    </div>
  );
}