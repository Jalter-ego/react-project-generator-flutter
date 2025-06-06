// components/properties/TableProperties.tsx

import type { PropertiesEditorProps } from "../../types/ComponentsPropertiesEditor";

export default function TableProperties({
  selectedComponent,
  updateComponentProperties,
}: PropertiesEditorProps) {
  const handleHeaderChange = (index: number, value: string) => {
    const newHeader = [...(selectedComponent.properties?.table?.header || [])];
    newHeader[index] = { title: value };
    updateComponentProperties(selectedComponent.id, {
      ...selectedComponent.properties,
      table: {
        ...selectedComponent.properties?.table,
        header: newHeader,
        data: selectedComponent.properties?.table?.data || [],
      },
    });
  };

  const addColumn = () => {
    const newHeader = [
      ...(selectedComponent.properties?.table?.header || []),
      { title: `Column ${(selectedComponent.properties?.table?.header?.length ?? 0) + 1}` },
    ];
    updateComponentProperties(selectedComponent.id, {
      ...selectedComponent.properties,
      table: {
        ...selectedComponent.properties?.table,
        header: newHeader,
        data: selectedComponent.properties?.table?.data || [],
      },
    });
  };

  const removeColumn = () => {
    const newHeader = [...(selectedComponent.properties?.table?.header || [])];
    newHeader.pop();
    updateComponentProperties(selectedComponent.id, {
      ...selectedComponent.properties,
      table: {
        ...selectedComponent.properties?.table,
        header: newHeader,
        data: selectedComponent.properties?.table?.data || [],
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Headers</label>
        {selectedComponent.properties?.table?.header?.map((col, index) => (
          <input
            key={index}
            type="text"
            value={col.title}
            onChange={(e) => handleHeaderChange(index, e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
        ))}
        <div className="flex gap-2 w-full items-center justify-between">
          <button
            className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-md"
            onClick={addColumn}
          >
            Añadir columna
          </button>
          <button
            className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-1 rounded-md"
            onClick={removeColumn}
          >
            Eliminar columna
          </button>
        </div>
      </div>
    </div>
  );
}