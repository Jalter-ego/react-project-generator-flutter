import { AllIcons, IconMenuDeep, IconUser } from '../assets/Icons';
import CalendarComponent from './library/Calendar';
import Card from './library/Card';
import { ChipComponent } from './library/Chip';
import { CircleAvatarComponent } from './library/CircleAvatar';
import { ComboboxDemo } from './library/Combobox';
import Container from './library/Container';
import ImageComponent from './library/Image';
import Label from './library/Label';
import { RadioComponent } from './library/Radio';
import { SwitchComponent } from './library/Switch';
import { Table } from './library/Table';
import TimePickerComponent from './library/TimePicker';

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

const ClickableIcon = ({ IconComponent, ...props }: { IconComponent: React.ComponentType, [key: string]: any }) => (
  <div
    onClick={props.onClick}
    style={{ display: 'inline-block', cursor: props.onClick ? 'pointer' : 'default' }}
  >
    <IconComponent />
  </div>
);

export const componentMap: Record<string, (props: any) => React.JSX.Element> = {
  button: Button,
  textfield: TextField,
  checkbox: Checkbox,
  appbar1: AppBar1,
  table: Table,
  card: Card,
  calendar: CalendarComponent,
  container: Container,
  label: Label,
  image: ImageComponent,
  combobox: ComboboxDemo,
  switch: SwitchComponent,
  radio: RadioComponent,
  chip: ChipComponent,
  circleavatar: CircleAvatarComponent,
  timepicker: TimePickerComponent,
  iconLock: AllIcons.IconLock,
  iconAdd: AllIcons.IconAdd,
  iconTag: AllIcons.IconTag,
  iconShare: AllIcons.IconShare,
  iconDotsHorizontal: AllIcons.IconDotsHorizontal,
  iconPlane: AllIcons.IconPlane,
  iconImage: AllIcons.IconImage,
  iconText: AllIcons.IconText,
  iconEmoji: AllIcons.IconEmoji,
  iconMicrophone: AllIcons.IconMicrophone,
  iconTrash: AllIcons.IconTrash,
  iconPencil: AllIcons.IconPencil,
  iconX: AllIcons.IconX,
  iconGoogle: AllIcons.IconGoogle,
  iconHeart: AllIcons.IconHeart,
  iconUser: (props) => <ClickableIcon IconComponent={AllIcons.IconUser} {...props} />,
  iconSearch: (props) => <ClickableIcon IconComponent={AllIcons.IconSearch} {...props} />,
  iconMenuDots: (props) => <ClickableIcon IconComponent={AllIcons.IconMenuDots} {...props} />,
  iconMenuDeep: (props) => <ClickableIcon IconComponent={AllIcons.IconMenuDeep} {...props} />,
  iconMessage: (props) => <ClickableIcon IconComponent={AllIcons.IconMessage} {...props} />,
  iconHeadphones: (props) => <ClickableIcon IconComponent={AllIcons.IconHeadphones} {...props} />,
  iconLogin: (props) => <ClickableIcon IconComponent={AllIcons.IconLogin} {...props} />,
  iconLogout: (props) => <ClickableIcon IconComponent={AllIcons.IconLogout} {...props} />,
  iconArrowUp: (props) => <ClickableIcon IconComponent={AllIcons.IconArrowUp} {...props} />,
  iconArrowDown: (props) => <ClickableIcon IconComponent={AllIcons.IconArrowDown} {...props} />,
  iconArrowLeft: (props) => <ClickableIcon IconComponent={AllIcons.IconArrowLeft} {...props} />,
  iconArrowRight: (props) => <ClickableIcon IconComponent={AllIcons.IconArrowRight} {...props} />,
  iconArrowUpDown: (props) => <ClickableIcon IconComponent={AllIcons.IconArrowUpDown} {...props} />,
};
