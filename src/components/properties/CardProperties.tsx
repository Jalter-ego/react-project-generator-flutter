import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function CardProperties({
    selectedComponent,
    updateComponentProperties,
}:PropertiesEditorProps) {
    const handlePropertyChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: 'string' | 'number' = 'string'
    ) => {
        const { name, value } = e.target;
        let parsedValue: string | number = value;

        if (type === 'number') {
            const num = parseFloat(value);
            parsedValue = isNaN(num) ? value : num;
        }

        updateComponentProperties(selectedComponent.id, {
            ...selectedComponent.properties,
            card: {
                title: name === "title"
                    ? String(parsedValue)
                    : selectedComponent.properties?.card?.title ?? "",
                description: name === "description"
                    ? String(parsedValue)
                    : selectedComponent.properties?.card?.description ?? "",
                price: name === "price"
                    ? Number(parsedValue)
                    : selectedComponent.properties?.card?.price ?? 0,
                image: name === "image"
                    ? String(parsedValue)
                    : selectedComponent.properties?.card?.image ?? "",
            },
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div>
                <label className="text-sm font-medium">Title</label>
                <input
                    type="text"
                    name="title"
                    value={selectedComponent.properties?.card?.title || ''}
                    onChange={(e) => handlePropertyChange(e, 'string')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Description</label>
                <input
                    type="text"
                    name="description"
                    value={selectedComponent.properties?.card?.description || ''}
                    onChange={(e) => handlePropertyChange(e, 'string')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Price</label>
                <input
                    type="number"
                    name="price"
                    value={selectedComponent.properties?.card?.price || ''}
                    onChange={(e) => handlePropertyChange(e, 'number')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>
            <div>
                <label className="text-sm font-medium">Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={selectedComponent.properties?.card?.image || ''}
                    onChange={(e) => handlePropertyChange(e, 'string')}
                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>
        </div>
    );
}