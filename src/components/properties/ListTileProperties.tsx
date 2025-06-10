import { iconOptions } from "@/assets/itemIcons";
import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function ListTileListProperties({
    selectedComponent,
    updateComponentProperties,
}: PropertiesEditorProps) {
    const props = selectedComponent.properties || {};

    const updateItem = (index: number, key: string, value: any) => {
        const updatedList = [...((props.list as any[]) || [])];
        updatedList[index][key] = value;

        updateComponentProperties(selectedComponent.id, {
            ...props,
            list: updatedList,
        });
    };

    const addItem = () => {
        const updatedList = [...(props.list || [])];
        updatedList.push({
            icon: "IconUser",
            title: "Nuevo ítem",
            subtitle: "",
            showCheckbox: false,
            checked: false,
        });

        updateComponentProperties(selectedComponent.id, {
            ...props,
            list: updatedList,
        });
    };

    const removeItem = (index: number) => {
        const updatedList = [...(props.list || [])];
        updatedList.splice(index, 1);
        updateComponentProperties(selectedComponent.id, {
            ...props,
            list: updatedList,
        });
    };

    return (
        <div className="flex flex-col gap-6">
            {(props.list || []).map((item, index) => (
                <div key={index} className="border-b border-gray-600 pb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold">Ítem {index + 1}</h4>
                        <button
                            className="text-red-400 hover:text-red-600 text-xs"
                            onClick={() => removeItem(index)}
                        >
                            Eliminar
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateItem(index, "title", e.target.value)}
                            placeholder="Título"
                            className="p-2 bg-gray-700 text-white rounded-md"
                        />
                        <input
                            type="text"
                            value={item.subtitle}
                            onChange={(e) => updateItem(index, "subtitle", e.target.value)}
                            placeholder="Subtítulo"
                            className="p-2 bg-gray-700 text-white rounded-md"
                        />
                        <select
                            value={item.icon}
                            onChange={(e) => updateItem(index, "icon", e.target.value)}
                            className="p-2 bg-gray-700 text-white rounded-md"
                        >
                            {iconOptions.map((icon) => (
                                <option key={icon} value={icon}>
                                    {icon}
                                </option>
                            ))}
                        </select>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={item.showCheckbox}
                                onChange={(e) => updateItem(index, "showCheckbox", e.target.checked)}
                            />
                            Mostrar checkbox
                        </label>
                        {item.showCheckbox && (
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={(e) => updateItem(index, "checked", e.target.checked)}
                                />
                                Checkbox marcado
                            </label>
                        )}
                    </div>
                </div>
            ))}

            <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                onClick={addItem}
            >
                + Agregar ítem
            </button>
        </div>
    );
}
