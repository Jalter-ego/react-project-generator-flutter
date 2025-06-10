import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function SliderProperties({
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
                <label className="text-sm font-medium">Valor inicial</label>
                <input
                    type="number"
                    name="value"
                    value={props.value || 0}
                    onChange={(e) => handleChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Mínimo</label>
                <input
                    type="number"
                    name="min"
                    value={props.min || 0}
                    onChange={(e) => handleChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Máximo</label>
                <input
                    type="number"
                    name="max"
                    value={props.max || 100}
                    onChange={(e) => handleChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Paso</label>
                <input
                    type="number"
                    name="step"
                    value={props.step || 1}
                    onChange={(e) => handleChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Color</label>
                <input
                    type="color"
                    name="color"
                    value={props.color || "#2196F3"}
                    onChange={(e) => handleChange(e, 'string')}
                    className="w-10 h-10 p-1 bg-transparent rounded-md border border-gray-500"
                />
            </div>
        </div>
    );
}
