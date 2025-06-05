import { useState } from 'react';
import type { ScreenType } from '../types/CanvasItem';

export function ScreenManager({
    screens,
    currentScreenId,
    setCurrentScreenId,
    onCreateNewScreen,
    onRenameScreen
}: {
    screens: ScreenType[];
    currentScreenId: string;
    setCurrentScreenId: (id: string) => void;
    onCreateNewScreen: () => void;
    onRenameScreen: (id: string, newName: string) => void;
}) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newName, setNewName] = useState('');

    const handleStartEditing = (screen: ScreenType) => {
        setEditingId(screen.id);
        setNewName(screen.name);
    };

    const handleSaveEdit = (id: string) => {
        if (newName.trim()) {
            onRenameScreen(id, newName.trim());
        }
        setEditingId(null);
    };
    return (
        <div className="p-4 bg-gray-800">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="font-medium">Pantallas</h3>
                <button
                    onClick={onCreateNewScreen}
                    className="px-2 py-1 bg-blue-500 rounded-md text-sm"
                >
                    + Nueva
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {screens.map(screen => (
                    <div
                        key={screen.id}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md ${currentScreenId === screen.id
                                ? 'bg-blue-600'
                                : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                    >
                        {editingId === screen.id ? (
                            <>
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
                                    className="flex-1 bg-gray-800 text-white px-2 py-1 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                />
                                <button
                                    onClick={() => handleSaveEdit(screen.id)}
                                    className="text-xs bg-green-500 px-2 py-1 rounded"
                                >
                                    ✓
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setCurrentScreenId(screen.id)}
                                    className="flex-1 text-left"
                                >
                                    {screen.name}
                                </button>
                                <button
                                    onClick={() => handleStartEditing(screen)}
                                    className="text-xs bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded"
                                >
                                    ✏️
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}