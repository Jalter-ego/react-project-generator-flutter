import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function LabelProperties({
    selectedComponent,
    updateComponentProperties,
}: PropertiesEditorProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'string' | 'number') => {
        const { name, value } = e.target;
        const parsed = type === 'number' ? parseFloat(value) || 0 : value;

        updateComponentProperties(selectedComponent.id, {
            ...selectedComponent.properties,
            [name]: parsed,
        });
    };

    const props = selectedComponent.properties || {};

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
                    type="text"
                    name="bg"
                    value={props.bg || ''}
                    onChange={(e) => handleChange(e, 'string')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Tamaño de fuente</label>
                <input
                    type="number"
                    name="fontSize"
                    value={props.fontSize || 14}
                    onChange={(e) => handleChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Ancho</label>
                <input
                    type="number"
                    name="width"
                    value={props.width || 120}
                    onChange={(e) => handleChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Alto</label>
                <input
                    type="number"
                    name="height"
                    value={props.height || 30}
                    onChange={(e) => handleChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
        </div>
    );
}
