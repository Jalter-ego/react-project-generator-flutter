import { IconPencil } from '@/assets/Icons';
import { useState } from 'react';
import type { ScreenType } from '../types/CanvasItem';

export function ScreenManager({
    screens,
    currentScreenId,
    setCurrentScreenId,
    onCreateNewScreen,
    onRenameScreen,
    onDeleteScreen,
}: {
    screens: ScreenType[];
    currentScreenId: string;
    setCurrentScreenId: (id: string) => void;
    onCreateNewScreen: () => void;
    onRenameScreen: (id: string, newName: string) => void;
    onDeleteScreen: (id: string) => void;
}) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newName, setNewName] = useState('');

    const handleStartEditing = (screen: ScreenType) => {
        setEditingId(screen.id);
        setNewName(screen.name);
    };

    const handleSaveEdit = (id: string) => {
        if (newName.trim() && newName.trim() !== screens.find(s => s.id === id)?.name) {
            onRenameScreen(id, newName.trim());
        }
        setEditingId(null);
    };

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={onCreateNewScreen}
                className="text-xs py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                + Nueva
            </button>

            {screens.map((screen) => {
                const isEditing = editingId === screen.id;

                return (
                    <div
                        key={screen.id}
                        className={`group flex items-center gap-2 px-2 py-1 rounded text-sm transition-colors ${currentScreenId === screen.id
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-zinc-700 text-zinc-300'
                            }`}
                    >
                        {isEditing ? (
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onBlur={() => handleSaveEdit(screen.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveEdit(screen.id);
                                    if (e.key === 'Escape') setEditingId(null);
                                }}
                                autoFocus
                                className="flex-1 bg-transparent border border-zinc-500 rounded px-2 py-0.5 text-white outline-none"
                            />
                        ) : (
                            <>
                                <button
                                    onClick={() => setCurrentScreenId(screen.id)}
                                    onDoubleClick={() => handleStartEditing(screen)}
                                    className="flex-1 text-left truncate"
                                    title="Doble clic para editar"
                                >
                                    {screen.name}
                                </button>
                                <button
                                    onClick={() => onDeleteScreen(screen.id)}
                                    className="text-xs text-red-400 opacity-0 group-hover:opacity-100 ml-1"
                                    title="Eliminar"
                                >
                                    ✕
                                </button>
                                <button
                                    onClick={() => handleStartEditing(screen)}
                                    className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Editar"
                                >
                                    <IconPencil />
                                </button>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
