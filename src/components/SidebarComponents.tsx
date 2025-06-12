import type { ScreenType } from "@/types/CanvasItem";
import { useState } from "react";
import { Draggable } from "./Draggable";
import { ScreenManager } from "./ScreenManager";
import { components } from "./sidebarComponents/Components";
import { icons } from "./sidebarComponents/Icons";

export default function SidebarComponents({
    screens,
    currentScreenId,
    setCurrentScreenId,
    onCreateNewScreen,
    onRenameScreen,
    onDeleteScreen
}: {
    screens: ScreenType[];
    currentScreenId: string;
    setCurrentScreenId: (id: string) => void;
    onCreateNewScreen: () => void;
    onRenameScreen: (id: string, newName: string) => void;
    onDeleteScreen: (id: string) => void;
}) {

    const [isScreensCollapsed, setIsScreensCollapsed] = useState(false);
    const [isComponentsCollapsed, setIsComponentsCollapsed] = useState(false);
    const [isIconsCollapsed, setIsIconsCollapsed] = useState(false);

    return (
        <aside className="w-[350px] h-screen overflow-y-auto bg-[#1f1f1f] flex flex-col py-6 gap-4 border-r border-zinc-700 shadow-lg">
            {/* Sección Pantallas */}
            <div className="px-2">
                <button
                    onClick={() => setIsScreensCollapsed(!isScreensCollapsed)}
                    className="flex items-center justify-between w-full mb-2"
                >
                    <h3 className="text-xs font-semibold text-zinc-400">Pantallas</h3>
                    <span className="text-zinc-400">
                        {isScreensCollapsed ? '⏵' : '⏷'}
                    </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isScreensCollapsed ? 'max-h-0' : 'max-h-[500px]'}`}>
                    <ScreenManager
                        screens={screens}
                        currentScreenId={currentScreenId}
                        setCurrentScreenId={setCurrentScreenId}
                        onCreateNewScreen={onCreateNewScreen}
                        onRenameScreen={onRenameScreen}
                        onDeleteScreen={onDeleteScreen}
                    />
                </div>
            </div>

            {/* Sección Componentes */}
            <div className="px-2">
                <button
                    onClick={() => setIsComponentsCollapsed(!isComponentsCollapsed)}
                    className="flex items-center justify-between w-full mb-2"
                >
                    <h3 className="text-xs font-semibold text-zinc-400">Componentes</h3>
                    <span className="text-zinc-400">
                        {isComponentsCollapsed ? '⏵' : '⏷'}
                    </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isComponentsCollapsed ? 'max-h-0' : 'max-h-[500px]'}`}>
                    <nav className="grid grid-cols-3 gap-2">
                        {components.map((component) => (
                            <Draggable
                                key={component.id}
                                id={component.id}
                                label={component.label}
                                section="components"
                            >
                                <div
                                    className="flex w-full items-center gap-1 p-2 rounded-lg shadow-md
                                     text-white hover:scale-[1.02] transition-transform"
                                    style={{ backgroundColor: component.bg }}
                                >
                                    <component.icon />
                                    <span className="text-[12px] font-medium">{component.label}</span>
                                </div>
                            </Draggable>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Sección Íconos */}
            <div className="px-2">
                <button
                    onClick={() => setIsIconsCollapsed(!isIconsCollapsed)}
                    className="flex items-center justify-between w-full mb-2"
                >
                    <h3 className="text-xs font-semibold text-zinc-400">Iconos</h3>
                    <span className="text-zinc-400">
                        {isIconsCollapsed ? '⏵' : '⏷'}
                    </span>
                </button>
                <div className="px-2">
                    <div className={`overflow-hidden transition-all duration-300 ${isIconsCollapsed ? 'max-h-0' : 'max-h-[600px]'}`}>
                        <div className="grid grid-cols-5 gap-2">
                            {icons.map((Icon) => (
                                <Draggable key={Icon.name} id={Icon.name} label={Icon.name} section="icons">
                                    <Icon.icon />
                                </Draggable>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}