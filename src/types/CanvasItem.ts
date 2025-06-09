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


export interface CanvasItem {
  id: string;
  type: string;
  children: CanvasItem[];
  x?: number;
  y?: number;
}
