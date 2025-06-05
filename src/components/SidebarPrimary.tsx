import type { ComponentInstance, ScreenType } from '../types/CanvasItem';

export default function SidebarPrimary({
  selectedComponent,
  updateComponentProperties,
  deleteComponent,
  duplicateComponent,
  screens,
  currentScreenId,
}: {
  selectedComponent: ComponentInstance | null;
  updateComponentProperties: (id: string, properties: ComponentInstance['properties']) => void;
  deleteComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  screens: ScreenType[];
  currentScreenId: string;
}) {
  const handlePropertyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: 'string' | 'number' | 'boolean' = 'string'
  ) => {
    if (!selectedComponent) return;
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
    <aside className="bg-[#1f1f1f] border-l border-gray-700 w-80 px-6 text-white">
      <section className="flex flex-col gap-4 border-b border-gray-600 pb-4">

        <div className="flex gap-2">
          <button
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Share
          </button>
          {selectedComponent && (
            <>
              <button
                onClick={() => deleteComponent(selectedComponent.id)}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => duplicateComponent(selectedComponent.id)}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Duplicate
              </button>
            </>
          )}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Properties</h2>
        {selectedComponent ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium">Type: {selectedComponent.type}</label>
            </div>
            {['button', 'textfield'].includes(selectedComponent.type) && (
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
            )}
            {['button', 'appbar1'].includes(selectedComponent.type) && (
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
            )}
            {['button', 'textfield', 'appbar1'].includes(selectedComponent.type) && (
              <>
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
                {['button', 'textfield'].includes(selectedComponent.type) && (
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
                )}
              </>
            )}
            {selectedComponent?.type === 'button' && (
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
                    .filter(screen => screen.id !== currentScreenId) // No mostrar la pantalla actual
                    .map(screen => (
                      <option key={screen.id} value={screen.id}>
                        {screen.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {selectedComponent.type === 'textfield' && (
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
            )}
            {selectedComponent.type === 'checkbox' && (
              <div>
                <label className="text-sm font-medium">Checked</label>
                <input
                  type="checkbox"
                  name="checked"
                  checked={selectedComponent.properties?.checked || false}
                  onChange={(e) => handlePropertyChange(e, 'boolean')}
                  className="ml-2 h-5 w-5 text-blue-600"
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-400">Select a component to edit its properties</p>
        )}
      </section>
    </aside>
  );
}