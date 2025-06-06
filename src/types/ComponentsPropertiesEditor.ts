import type { ComponentInstance, ScreenType } from '../types/CanvasItem';

export interface PropertiesEditorProps {
  selectedComponent: ComponentInstance;
  updateComponentProperties: (id: string, properties: ComponentInstance['properties']) => void;
  screens: ScreenType[];
  currentScreenId: string;
}