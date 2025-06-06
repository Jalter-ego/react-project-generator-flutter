import type { ScreenType } from "@/types/CanvasItem";
import { Draggable } from "./Draggable";
import { ScreenManager } from "./ScreenManager";
import { components } from "./sidebarComponents/Components";
import { icons } from "./sidebarComponents/Icons";

export default function SidebarComponents({
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

    return (
        <aside className="w-[250px] h-screen overflow-y-auto bg-[#1f1f1f] flex flex-col py-6 gap-4 border-r border-zinc-700 shadow-lg">
            <ScreenManager
                screens={screens}
                currentScreenId={currentScreenId}
                setCurrentScreenId={setCurrentScreenId}
                onCreateNewScreen={onCreateNewScreen}
                onRenameScreen={onRenameScreen}
            />
            <header className='border-b border-zinc-600 w-full flex px-2 pb-3'>
                <h1 className='font-semibold text-[14px]'>Componentes</h1>
            </header>

            <nav className="grid grid-cols-2 gap-2 px-2">
                {components.map((component) => (
                    <Draggable
                        key={component.id}
                        id={component.id}
                        label={component.label}
                        section="components"
                    >
                        <div
                            className="flex w-full items-center gap-1 p-2 rounded-lg shadow-md
                             text-white hover:scale-[1.02] transition-transform "
                            style={{ backgroundColor: component.bg }}
                        >
                            <component.icon />
                            <span className="text-[12px] font-medium">{component.label}</span>
                        </div>
                    </Draggable>
                ))}

            </nav>

            {/* Sección de íconos en grid */}
            <div className="px-2">
                <h2 className="text-xs font-semibold text-zinc-400 mb-2">Iconos</h2>
                <div className="grid grid-cols-3 gap-2">
                    {icons.map((Icon) => (
                        <Draggable key={Icon.name} id={Icon.name} label={Icon.name} section="icons">
                            <Icon.icon />
                        </Draggable>
                    ))}
                </div>
            </div>
        </aside>
    )
}