import { IconCalendar, IconCard, IconLabel, IconLock, IconMenuDeep, IconSearch, IconTable, IconUser } from "../assets/Icons";
import { AppBar1, Button, Checkbox, TextField } from "./ComponentLibrary";
import { Draggable } from "./Draggable";
import { Table } from "./library/Table";

export const components = [
    {
        id: "button",
        label: "Botón",
        icon: IconTable,
        component: Button,
        bg: "#18181b",
    },
    {
        id: "textfield",
        label: "TextField",
        icon: IconTable,
        component: TextField,
        bg: "#18181b",
    },
    {
        id: "checkbox",
        label: "Checkbox",
        icon: IconTable,
        component: Checkbox,
        bg: "#18181b",
    },
    {
        id: "appbar1",
        label: "AppBar",
        icon: IconTable,
        component: AppBar1,
        bg: "#18181b"
    },
    {
        id: "table",
        label: "Table",
        icon: IconTable,
        component: Table,
        bg: "#18181b"
    },
    {
        id: "card",
        label: "Card",
        icon: IconCard,
        bg: "#18181b",
    },
    {
        id: "calendar",
        label: "Calendar",
        icon: IconCalendar,
        bg: "#18181b",
    },
    {
        id: "container",
        label: "Container",
        icon: IconTable,
        bg: "#18181b",
    },
    {
        id: "label",
        label: "Label",
        icon: IconLabel,
        bg: "#18181b",
    }
]

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
        <aside className="w-[250px] h-screen overflow-y-auto bg-[#1f1f1f] flex flex-col py-6 gap-4 border-r border-zinc-700 shadow-lg">

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