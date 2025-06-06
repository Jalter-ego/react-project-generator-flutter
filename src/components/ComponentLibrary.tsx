import { IconLock, IconMenuDeep, IconSearch, IconUser } from '../assets/Icons';
import CalendarComponent from './library/Calendar';
import Card from './library/Card';
import Container from './library/Container';
import { Table } from './library/Table';

export function Button({
  label = 'Botón',
  bg = '#45def2',
  width = 128,
  height = 32,
  borderRadius = 12,
  fontSize = 16,
  onClick
}: {
  label?: string;
  bg?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  fontSize?: number;
  onClick?: () => void;
}) {
  return (
    <button
      className="text-white font-semibold shadow-md hover:shadow-lg transition-shadow"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bg,
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}px`,
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function TextField({
  label = '',
  placeholder = 'Campo de texto',
  width = 232,
  height = 32,
  borderRadius = 12,
}: {
  label?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}) {
  return (
    <input
      className="rounded-xl border border-zinc-300 px-3 py-1 text-black shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition-shadow"
      placeholder={placeholder}
      value={label}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
      }}
    />
  );
}

export function Checkbox({ checked = false }: { checked?: boolean }) {
  return (
    <input
      type="checkbox"
      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
      defaultChecked={checked}
    />
  );
}

export function AppBar1({
  width = 300,
  height = 32,
  bg = '#ffffff',
}: {
  width?: number;
  height?: number;
  bg?: string;
}) {
  return (
    <nav
      className="flex items-center justify-between px-4 shadow-md"
      style={{ width: `${width}px`, height: `${height}px`, backgroundColor: bg }}
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
  table: Table,
  card: Card,
  calendar: CalendarComponent,
  container: Container
};