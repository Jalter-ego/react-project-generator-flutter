import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function ChipProperties({
    selectedComponent,
    updateComponentProperties,
}: PropertiesEditorProps) {
    const props = selectedComponent.properties || {};

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        _type: 'string'
    ) => {
        const { name, value } = e.target;
        updateComponentProperties(selectedComponent.id, {
            ...props,
            [name]: value,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div>
                <label className="text-sm font-medium">Texto</label>
                <input
                    type="text"
                    name="label"
                    value={props.label || ''}
                    onChange={(e) => handleChange(e, 'string')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Color de fondo</label>
                <input
                    type="color"
                    name="bg"
                    value={props.bg || '#6366F1'}
                    onChange={(e) => handleChange(e, 'string')}
                    className="w-10 h-10 p-1 bg-transparent rounded-md border border-gray-500"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Ícono o letra</label>
                <input
                    type="text"
                    name="icon"
                    value={props.icon || ''}
                    onChange={(e) => handleChange(e, 'string')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                    maxLength={2}
                />
            </div>
        </div>
    );
}
