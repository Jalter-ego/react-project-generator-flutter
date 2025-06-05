import type { ScreenType } from '../types/CanvasItem';

export function ScreenManager({
    screens,
    currentScreenId,
    setCurrentScreenId,
    onCreateNewScreen
}: {
    screens: ScreenType[];
    currentScreenId: string;
    setCurrentScreenId: (id: string) => void;
    onCreateNewScreen: () => void;
}) {
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
                    <button
                        key={screen.id}
                        onClick={() => setCurrentScreenId(screen.id)}
                        className={`px-3 py-2 text-left rounded-md ${currentScreenId === screen.id
                                ? 'bg-blue-600'
                                : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                    >
                        {screen.name}
                    </button>
                ))}
            </div>
        </div>
    );
}