export interface ScreenType {
  id: string;
  name: string;
  components: ComponentInstance[];
}

export type ComponentInstance = {
  id: string;
  type: string;
  x: number;
  y: number;
  properties?: {
    label?: string;
    bg?: string;
    width?: number;
    height?: number;
    placeholder?: string;
    checked?: boolean;
    borderRadius?: number;
    fontSize?: number;
    navigateTo?: string;
    table?: ComponentInstanceTable
    card?: ComponentInstanceCard;
    combobox?: ComponentInstanceCombobox;
    image?: string;
    colorFont?: string;
    icon?: string;
    size?: number;
    borderColor?: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
    list?: {
      icon: string;
      title: string;
      subtitle?: string;
      showCheckbox?: boolean;
      checked?: boolean;
    }[];
    buttons?: { icon: string }[];
    initialActive?: number;
    position?: string;
    text?: string;
    sidebar?: ComponentInstanceSidebar
  };
};

export type ComponentInstanceTable = {
  header: { title: string }[];
  data: Record<string, string>[];
}

export type ComponentInstanceCombobox = {
  label: string;
}[];

export type ComponentInstanceCard = {
  title: string;
  image: string;
  description: string;
  price: number;
}

export type ComponentInstanceSidebar = {
  title: string
  subtitle: string
  bg: string
  items: {
    item: string,
    icon: string,
    navigateTo?: string;
  }[]
}


export interface CanvasItem {
  id: string;
  type: string;
  children: CanvasItem[];
  x?: number;
  y?: number;
}
