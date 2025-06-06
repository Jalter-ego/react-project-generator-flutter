// components/properties/TextfieldProperties.tsx
import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function TextfieldProperties({
  selectedComponent,
  updateComponentProperties,
}: PropertiesEditorProps) {
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
      [name]: parsedValue,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium">Label</label>
        <input
          type="text"
          name="label"
          value={selectedComponent.properties?.label || ''}
          onChange={(e) => handlePropertyChange(e, 'string')}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Placeholder</label>
        <input
          type="text"
          name="placeholder"
          value={selectedComponent.properties?.placeholder || ''}
          onChange={(e) => handlePropertyChange(e, 'string')}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Width (px)</label>
        <input
          type="number"
          name="width"
          value={selectedComponent.properties?.width || ''}
          onChange={(e) => handlePropertyChange(e, 'number')}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          min={0}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Height (px)</label>
        <input
          type="number"
          name="height"
          value={selectedComponent.properties?.height || ''}
          onChange={(e) => handlePropertyChange(e, 'number')}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          min={0}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Border Radius (px)</label>
        <input
          type="number"
          name="borderRadius"
          value={selectedComponent.properties?.borderRadius || 12}
          onChange={(e) => handlePropertyChange(e, 'number')}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          min={0}
        />
      </div>
    </div>
  );
}