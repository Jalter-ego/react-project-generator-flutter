import type { ComponentInstance, ScreenType } from '../types/CanvasItem';
import type { PropertiesEditorProps } from '../types/ComponentsPropertiesEditor';
import BadgeProperties from './properties/BadgeProperties';
import ButtonProperties from './properties/ButtonProperties';
import CardProperties from './properties/CardProperties';
import ChipProperties from './properties/ChipProperties';
import CircleAvatarProperties from './properties/CircleAvatarProperties';
import ComboboxProperties from './properties/ComboboxProperties';
import ContainerProperties from './properties/containerProperties';
import IconProperties from './properties/IconProperties';
import ImageProperties from './properties/ImageProperties';
import LabelProperties from './properties/LabelProperties';
import ListTileListProperties from './properties/ListTileProperties';
import SliderProperties from './properties/SliderProperties';
import TableProperties from './properties/TableProperties';
import TextfieldProperties from './properties/TextfieldProperties';
import ToggleButtonsProperties from './properties/ToggleButtonsProperties';

const componentEditors: Record<string, React.FC<PropertiesEditorProps>> = {
  button: ButtonProperties,
  textfield: TextfieldProperties,
  table: TableProperties,
  card: CardProperties,
  container: ContainerProperties,
  label: LabelProperties,
  image: ImageProperties,
  combobox: ComboboxProperties,
  chip: ChipProperties,
  circleavatar: CircleAvatarProperties,
  slider: SliderProperties,
  listtilelist: ListTileListProperties,
  togglebuttons: ToggleButtonsProperties,
  badge: BadgeProperties,
  iconUser: IconProperties,
  iconSearch: IconProperties,
  iconLogin: IconProperties,
  iconLogout: IconProperties,
  iconMenuDots: IconProperties,
  iconMenuDeep: IconProperties,
  iconMessage: IconProperties,
  iconHeadphones: IconProperties,
  iconArrowUp: IconProperties,
  iconArrowDown: IconProperties,
  iconArrowLeft: IconProperties,
  iconArrowRight: IconProperties,
  iconArrowUpDown: IconProperties,
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