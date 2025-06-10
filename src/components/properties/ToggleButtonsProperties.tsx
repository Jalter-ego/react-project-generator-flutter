import { AllIcons } from "@/assets/Icons";
import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function ToggleButtonsProperties({
  selectedComponent,
  updateComponentProperties,
}: PropertiesEditorProps) {
  const props = selectedComponent.properties || {};

  const updateButton = (
    index: number,
    key: "icon",
    value: string
  ) => {
    const newButtons = [...(props.buttons || [])];
    const updated = { ...newButtons[index], [key]: value };
    newButtons[index] = updated;

    updateComponentProperties(selectedComponent.id, {
      ...props,
      buttons: newButtons,
    });
  };

  const addButton = () => {
    const newButtons = [...(props.buttons || [])];
    newButtons.push({ icon: "IconUser" });
    updateComponentProperties(selectedComponent.id, {
      ...props,
      buttons: newButtons,
    });
  };

  const removeButton = (index: number) => {
    const newButtons = [...(props.buttons || [])];
    newButtons.splice(index, 1);
    updateComponentProperties(selectedComponent.id, {
      ...props,
      buttons: newButtons,
    });
  };

  const iconOptions = Object.keys(AllIcons);

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium">Botones de navegación</label>
      {(props.buttons || []).map((btn, idx) => (
        <div key={idx} className="border-b border-gray-600 pb-2">
          <label className="text-xs">Ícono</label>
          <select
            value={btn.icon}
            onChange={(e) => updateButton(idx, "icon", e.target.value)}
            className="w-full p-1 bg-gray-700 text-white rounded-md"
          >
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
          <button
            className="text-red-400 text-xs mt-2"
            onClick={() => removeButton(idx)}
          >
            Eliminar botón
          </button>
        </div>
      ))}
      <button
        className="px-2 py-1 bg-blue-600 text-white text-sm rounded"
        onClick={addButton}
      >
        + Agregar botón
      </button>
    </div>
  );
}
