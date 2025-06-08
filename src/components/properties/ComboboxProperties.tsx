// properties/ComboboxProperties.tsx
import type { ComponentInstance, ScreenType } from "@/types/CanvasItem";
import { memo } from "react";

interface ComboboxPropertiesProps {
  selectedComponent: ComponentInstance;
  updateComponentProperties: (id: string, properties: ComponentInstance['properties']) => void;
  screens: ScreenType[];
  currentScreenId: string;
}

const ComboboxProperties = memo(function ComboboxProperties({
  selectedComponent,
  updateComponentProperties,
}: ComboboxPropertiesProps) {
  const comboboxData = selectedComponent.properties?.combobox || [];

  const handleAddOption = () => {
    const newOption = { label: `Option ${comboboxData.length + 1}` };
    updateComponentProperties(selectedComponent.id, {
      ...selectedComponent.properties,
      combobox: [...comboboxData, newOption],
    });
  };

  return (
    <div>
      <h3 className="font-semibold pb-2">Combobox Options</h3>
      {comboboxData.map((option, index) => (
        <div key={index} className="flex py-2">
          <input
            type="text"
            value={option.label}
            onChange={(e) =>
              updateComponentProperties(selectedComponent.id, {
                ...selectedComponent.properties,
                combobox: comboboxData.map((item, i) =>
                  i === index ? { ...item, label: e.target.value } : item
                ),
              })
            }
            className="border border-zinc-500 p-3 rounded-2xl "
          />
        </div>
      ))}
      <button
        onClick={handleAddOption}
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-xl
            hover:bg-blue-600 text-[14px]"
      >
        Agregar opcion
      </button>
    </div>
  );
});
export default ComboboxProperties;