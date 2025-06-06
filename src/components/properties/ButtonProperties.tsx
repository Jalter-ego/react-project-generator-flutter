// components/properties/ButtonProperties.tsx
import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function ButtonProperties({
  selectedComponent,
  updateComponentProperties,
  screens,
  currentScreenId,
}: PropertiesEditorProps) {
  const handlePropertyChange = (
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
        <label className="text-sm font-medium">Background Color</label>
        <input
          type="color"
          name="bg"
          value={selectedComponent.properties?.bg || '#45def2'}
          onChange={(e) => handlePropertyChange(e, 'string')}
          className="w-full h-10 mt-1 rounded-md"
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
      <div>
        <label className="text-sm font-medium">Navegar a</label>
        <select
          name="navigateTo"
          value={selectedComponent.properties?.navigateTo || ''}
          onChange={(e) => handlePropertyChange(e, 'string')}
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