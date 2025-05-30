export interface CanvasItem {
  id: string;
  type: string;
  children: CanvasItem[];
  x?: number;
  y?: number;
}
