import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function BadgeProperties({
  selectedComponent,
  updateComponentProperties,
}: PropertiesEditorProps) {
  const props = selectedComponent.properties || {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    updateComponentProperties(selectedComponent.id, {
      ...props,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium">Texto central</label>
        <input
          type="text"
          name="text"
          value={props.text || ""}
          onChange={handleChange}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md text-center"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Etiqueta del badge</label>
        <input
          type="text"
          name="label"
          value={props.label || ""}
          onChange={handleChange}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md text-center"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Color de fondo del badge</label>
        <input
          type="color"
          name="bg"
          value={props.bg || "#ff3b30"}
          onChange={handleChange}
          className="w-full h-10 mt-1 bg-gray-700 rounded-md"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Posición del badge</label>
        <select
          name="position"
          value={props.position || "top-right"}
          onChange={handleChange}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
        >
          <option value="top-right">Arriba derecha</option>
          <option value="top-left">Arriba izquierda</option>
          <option value="bottom-right">Abajo derecha</option>
          <option value="bottom-left">Abajo izquierda</option>
        </select>
      </div>
    </div>
  );
}
