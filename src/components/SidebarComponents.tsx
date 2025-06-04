import { IconLock, IconMenuDeep, IconSearch, IconUser } from "../assets/Icons";
import { AppBar1, Button, Checkbox, TextField } from "./ComponentLibrary";
import { Draggable } from "./Draggable";

export default function SidebarComponents() {
    const icons = [
        {
            name: "iconUser",
            icon: IconUser
        },
        {
            name: "iconSearch",
            icon: IconSearch
        },
        {
            name: "iconLock",
            icon: IconLock
        },
        {
            name: "iconMenuDeep",
            icon: IconMenuDeep
        }
    ];
    return (
        <aside className="w-[250px] h-screen bg-[#1f1f1f] flex flex-col py-6 gap-4 border-r border-zinc-700 shadow-lg">

            <header className='border-b border-zinc-600 w-full flex px-2 pb-3'>
                <h1 className='font-semibold text-[14px]'>Componentes</h1>
            </header>

            <nav className="flex flex-col gap-2 px-2">
                <Draggable id="button" label="Botón"><Button /></Draggable>
                <Draggable id="textfield" label="Campo de texto"><TextField /></Draggable>
                <Draggable id="checkbox" label="Checkbox"><Checkbox /></Draggable>
                <Draggable id="appbar1" label="AppBar"><AppBar1 /></Draggable>
            </nav>

            {/* Sección de íconos en grid */}
            <div className="px-2">
                <h2 className="text-xs font-semibold text-zinc-400 mb-2">Iconos</h2>
                <div className="grid grid-cols-3 gap-2">
                    {icons.map((Icon) => (
                        <Draggable key={Icon.name} id={Icon.name} label={Icon.name}>
                            <Icon.icon />
                        </Draggable>
                    ))}
                </div>
            </div>
        </aside>
    )
}