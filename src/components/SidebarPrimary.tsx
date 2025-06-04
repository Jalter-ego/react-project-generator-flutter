import { SignedIn, UserButton } from '@clerk/clerk-react';
import type { ComponentInstance } from './DropZone';

export default function SidebarPrimary({
  selectedComponent,
  updateComponentProperties,
}: {
  selectedComponent: ComponentInstance | null;
  updateComponentProperties: (id: string, properties: ComponentInstance['properties']) => void;
}) {
  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!selectedComponent) return;
    const { name, value } = e.target;
    console.log(value);
    
    updateComponentProperties(selectedComponent.id, {
      ...selectedComponent.properties,
      [name]: value.includes('.') ? parseFloat(value) : parseInt(value) || value,
    });
  };

  return (
    <aside className="bg-[#333333] border-l border-zinc-600 w-[300px] p-4">
      <section className="flex flex-col gap-4 border-b border-zinc-500 pb-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
          >
            Share
          </button>
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-white text-lg font-semibold mb-2">Properties</h2>
        {selectedComponent ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-white text-sm">Type: {selectedComponent.type}</label>
            </div>
            {['button', 'textfield'].includes(selectedComponent.type) && (
              <div>
                <label className="text-white text-sm">Label</label>
                <input
                  type="text"
                  name="label"
                  value={selectedComponent.properties?.label || ''}
                  onChange={handlePropertyChange}
                  className="w-full p-2 mt-1 bg-zinc-700 text-white rounded"
                />
              </div>
            )}
            {selectedComponent.type === 'button' && (
              <div>
                <label className="text-white text-sm">Color</label>
                <input type="color"
                    name="bg"
                    value={selectedComponent.properties?.color || '#00bcd4'}
                    onChange={handlePropertyChange}
                    className="w-full rounded"
                />
              </div>
            )}
            {['button', 'textfield', 'appbar1'].includes(selectedComponent.type) && (
              <>
                <div>
                  <label className="text-white text-sm">Width</label>
                  <input
                    type="number"
                    name="width"
                    value={selectedComponent.properties?.width || ''}
                    onChange={handlePropertyChange}
                    className="w-full p-2 mt-1 bg-zinc-700 text-white rounded"
                  />
                </div>
                <div>
                  <label className="text-white text-sm">Height</label>
                  <input
                    type="number"
                    name="height"
                    value={selectedComponent.properties?.height || ''}
                    onChange={handlePropertyChange}
                    className="w-full p-2 mt-1 bg-zinc-700 text-white rounded"
                  />
                </div>
              </>
            )}
            {selectedComponent.type === 'textfield' && (
              <div>
                <label className="text-white text-sm">Placeholder</label>
                <input
                  type="text"
                  name="placeholder"
                  value={selectedComponent.properties?.placeholder || ''}
                  onChange={handlePropertyChange}
                  className="w-full p-2 mt-1 bg-zinc-700 text-white rounded"
                />
              </div>
            )}
            {selectedComponent.type === 'checkbox' && (
              <div>
                <label className="text-white text-sm">Checked</label>
                <input
                  type="checkbox"
                  name="checked"
                  checked={selectedComponent.properties?.checked || false}
                  onChange={(e) =>
                    updateComponentProperties(selectedComponent.id, {
                      ...selectedComponent.properties,
                      checked: e.target.checked,
                    })
                  }
                  className="ml-2"
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-zinc-400">Select a component to edit its properties</p>
        )}
      </section>
    </aside>
  );
}