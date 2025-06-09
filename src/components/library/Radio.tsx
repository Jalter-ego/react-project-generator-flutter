export function RadioComponent({ checked = false }: { checked?: boolean }) {
  return (
    <input
      type="radio"
      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-400"
      defaultChecked={checked}
    />
  );
}
