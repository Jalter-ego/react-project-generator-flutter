import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function ImageProperties({
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
                <label className="text-sm font-medium">URL de la Imagen</label>
                <input
                    type="text"
                    name="image"
                    value={props.image || ''}
                    onChange={(e) => handleChange(e, 'string')}
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
                    value={props.height || 120}
                    onChange={(e) => handleChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Bordes redondeados</label>
                <input
                    type="number"
                    name="borderRadius"
                    value={props.borderRadius || 12}
                    onChange={(e) => handleChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
        </div>
    );
}
