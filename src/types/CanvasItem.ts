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
  };
};

export interface CanvasItem {
  id: string;
  type: string;
  children: CanvasItem[];
  x?: number;
  y?: number;
}
