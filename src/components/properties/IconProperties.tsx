import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function IconProperties({
    selectedComponent,
    updateComponentProperties,
    screens,
    currentScreenId,
}: PropertiesEditorProps) {
    const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        updateComponentProperties(selectedComponent.id, {
            ...selectedComponent.properties,
            navigateTo: value,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div>
                <label className="text-sm font-medium">Navegar a</label>
                <select
                    name="navigateTo"
                    value={selectedComponent.properties?.navigateTo || ''}
                    onChange={handlePropertyChange}
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
    );
}