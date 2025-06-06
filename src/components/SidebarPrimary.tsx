// components/SidebarPrimary.tsx
import type { ComponentInstance, ScreenType } from '../types/CanvasItem';
import type { PropertiesEditorProps } from '../types/ComponentsPropertiesEditor';
import ButtonProperties from './properties/ButtonProperties';
import TableProperties from './properties/TableProperties';
import TextfieldProperties from './properties/TextFieldProperties';

const componentEditors: Record<string, React.FC<PropertiesEditorProps>> = {
  button: ButtonProperties,
  textfield: TextfieldProperties,
  table: TableProperties,
};

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
  const PropertiesEditor = selectedComponent ? componentEditors[selectedComponent.type] : null;

  return (
    <aside className="bg-[#1f1f1f] border-l border-gray-700 w-80 px-6 text-white">
      <section className="flex flex-col gap-4 border-b border-gray-600 pb-4">
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
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
        {selectedComponent && PropertiesEditor ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium">Type: {selectedComponent.type}</label>
            </div>
            <PropertiesEditor
              selectedComponent={selectedComponent}
              updateComponentProperties={updateComponentProperties}
              screens={screens}
              currentScreenId={currentScreenId}
            />
          </div>
        ) : (
          <p className="text-gray-400">Select a component to edit its properties</p>
        )}
      </section>
    </aside>
  );
}