import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function CircleAvatarProperties({
    selectedComponent,
    updateComponentProperties,
}: PropertiesEditorProps) {
    const props = selectedComponent.properties || {};

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: 'string' | 'number'
    ) => {
        const { name, value } = e.target;
        const parsed = type === 'number' ? parseFloat(value) || 0 : value;

        updateComponentProperties(selectedComponent.id, {
            ...props,
            [name]: parsed,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div>
                <label className="text-sm font-medium">URL de la imagen</label>
                <input
                    type="text"
                    name="image"
                    value={props.image || ''}
                    onChange={(e) => handleChange(e, 'string')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Tamaño (px)</label>
                <input
                    type="number"
                    name="size"
                    value={props.size || 80}
                    onChange={(e) => handleChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Color del borde</label>
                <input
                    type="color"
                    name="borderColor"
                    value={props.borderColor || '#ffffff'}
                    onChange={(e) => handleChange(e, 'string')}
                    className="w-10 h-10 p-1 bg-transparent rounded-md border border-gray-500"
                />
            </div>
        </div>
    );
}
