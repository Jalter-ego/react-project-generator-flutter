import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";
import { AllIcons, IconTrash } from "@/assets/Icons";

export default function SidebarProperties({
    selectedComponent,
    updateComponentProperties,
    screens,
    currentScreenId,
}: PropertiesEditorProps) {
    const sidebar = selectedComponent.properties?.sidebar;

    if (!sidebar) return <p className="text-red-400">Sidebar no definido</p>;

    const handleSidebarChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        type: 'string' | 'number' | 'boolean' = 'string'
    ) => {
        const { name, value } = e.target;
        let parsedValue: string | number | boolean = value;

        if (type === 'number') {
            const num = parseFloat(value);
            parsedValue = isNaN(num) ? value : num;
        } else if (type === 'boolean') {
            parsedValue = (e as React.ChangeEvent<HTMLInputElement>).target.checked;
        }

        updateComponentProperties(selectedComponent.id, {
            ...selectedComponent.properties,
            sidebar: {
                ...sidebar,
                [name]: parsedValue,
            },
        });
    };

    const handleItemChange = (
        index: number,
        field: 'item' | 'icon' | 'navigateTo',
        value: string
    ) => {
        const updatedItems = [...sidebar.items];
        updatedItems[index][field] = value;

        updateComponentProperties(selectedComponent.id, {
            ...selectedComponent.properties,
            sidebar: {
                ...sidebar,
                items: updatedItems,
            },
        });
    };

    const handleAddItem = () => {
        const newItem = {
            item: 'Nuevo Item',
            icon: 'IconUser',
            navigateTo: '',
        };

        updateComponentProperties(selectedComponent.id, {
            ...selectedComponent.properties,
            sidebar: {
                ...sidebar,
                items: [...sidebar.items, newItem],
            },
        });
    };

    const handleDeleteItem = (index: number) => {
        const updatedItems = sidebar.items.filter((_, i) => i !== index);
        updateComponentProperties(selectedComponent.id, {
            ...selectedComponent.properties,
            sidebar: {
                ...sidebar,
                items: updatedItems,
            },
        });
    };

    return (
        <div className="flex flex-col gap-4 min-h-screen overflow-y-auto ">
            <div>
                <label className="text-sm font-medium">Título</label>
                <input
                    type="text"
                    name="title"
                    value={sidebar.title}
                    onChange={(e) => handleSidebarChange(e, 'string')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Subtítulo</label>
                <input
                    type="text"
                    name="subtitle"
                    value={sidebar.subtitle}
                    onChange={(e) => handleSidebarChange(e, 'string')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Color de fondo</label>
                <input
                    type="color"
                    name="bg"
                    value={sidebar.bg || '#ffffff'}
                    onChange={(e) => handleSidebarChange(e, 'string')}
                    className="w-full h-10 mt-1 rounded-md"
                />
            </div>

            <div className="mt-4">
                <label className="text-sm font-medium">Items del Sidebar</label>
                <div className="flex flex-col gap-3 mt-2">
                    {sidebar.items.map((item, index) => (
                        <div key={index} className="bg-gray-800 p-3 rounded-md relative">
                            <div
                                className="absolute top-1 right-2 text-red-400 text-xs hover:text-red-600"
                                onClick={() => handleDeleteItem(index)}
                            >
                                <IconTrash/>
                            </div>

                            <input
                                type="text"
                                value={item.item}
                                placeholder="Texto"
                                onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                                className="w-full p-1 mb-2 bg-gray-700 text-white rounded-md"
                            />
                            <select
                                value={item.icon}
                                onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                                className="w-full p-1 mb-2 bg-gray-700 text-white rounded-md"
                            >
                                {Object.keys(AllIcons).map((iconKey) => (
                                    <option key={iconKey} value={iconKey}>
                                        {iconKey}
                                    </option>
                                ))}
                            </select>
                            <div>
                                <label className="text-sm font-medium">Navegar a</label>
                                <select
                                    name="navigateTo"
                                    value={item.navigateTo}
                                    onChange={(e) =>
                                        handleItemChange(index, 'navigateTo', e.target.value)
                                    }
                                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                                >
                                    <option value="">No navegar</option>
                                    {screens
                                        .filter((screen) => screen.id !== currentScreenId)
                                        .map((screen) => (
                                            <option key={screen.id} value={screen.id}>
                                                {screen.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleAddItem}
                    className="mt-3 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Agregar Item
                </button>
            </div>
        </div>
    );
}
