import { IconLock, IconMenuDeep, IconSearch, IconUser } from '../assets/Icons';

export function Button({ label = 'Botón', bg = '#45def2', width = 128, height = 32 }:
   { label?: string; bg?: string; width?: number; height?: number }) {
  return (
    <button
      className={` text-white rounded-xl font-semibold cursor-pointer`}
      style={{ width: `${width}px`, height: `${height}px`, backgroundColor: bg }}
    >
      {label}
    </button>
  );
}

export function TextField({ label = "", placeholder = 'Campo de texto', width = 232, height = 32 }:
{ label?: string; placeholder?: string; width?: number; height?: number }) {
  return (
    <input
      className="rounded-xl border border-zinc-300 px-2 text-black"
      placeholder={placeholder}
      value={label}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}

export function Checkbox({ checked = false }: { checked?: boolean }) {
  return <input type="checkbox" className="w-4 h-4 bg-white" defaultChecked={checked} />;
}

export function AppBar1({ width = 300, height = 32 }: { width?: number; height?: number }) {
  return (
    <nav
      className="flex items-center justify-between text-zinc-700 px-4"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <IconMenuDeep />
      <IconUser />
    </nav>
  );
}

export const componentMap: Record<string, (props: any) => React.JSX.Element> = {
  button: Button,
  textfield: TextField,
  checkbox: Checkbox,
  appbar1: AppBar1,
  iconUser: IconUser,
  iconSearch: IconSearch,
  iconLock: IconLock,
  iconMenuDeep: IconMenuDeep,
};