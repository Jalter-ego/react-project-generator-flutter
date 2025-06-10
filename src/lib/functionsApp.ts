import type { ComponentInstance, ScreenType } from "@/types/CanvasItem";
import type { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from 'uuid';

interface FunctionsAppProps {
  historyIndex: number;
  setHistoryIndex: Dispatch<SetStateAction<number>>;
  setScreens: Dispatch<SetStateAction<ScreenType[]>>;
  history: ScreenType[][];
  screens: ScreenType[];
  currentScreenId: string
  updateWithHistory: (newScreens: ScreenType[])=> void
  selectedComponentId: string | null
  setSelectedComponentId: Dispatch<SetStateAction<string|null>>
}

export const functionsApp = ({
  historyIndex,
  setHistoryIndex,
  setScreens,
  history,
  screens,
  currentScreenId,
  updateWithHistory,
  selectedComponentId,
  setSelectedComponentId
}: FunctionsAppProps) => {
  function undo() {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setScreens(history[newIndex]);
    }
  }

  function redo() {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setScreens(history[newIndex]);
    }
  }

  function exportDesign() {
    const json = JSON.stringify(screens, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function updateComponentProperties(
    id: string,
    properties: ComponentInstance["properties"]
  ) {
    const newScreens = screens.map((screen) => {
      if (screen.id === currentScreenId) {
        return {
          ...screen,
          components: screen.components.map((comp) =>
            comp.id === id ? { ...comp, properties } : comp
          ),
        };
      }
      return screen;
    });
    updateWithHistory(newScreens);
  }

  function deleteComponent(id: string) {
    const newScreens = screens.map((screen) => {
      if (screen.id === currentScreenId) {
        return {
          ...screen,
          components: screen.components.filter((comp) => comp.id !== id),
        };
      }
      return screen;
    });
    updateWithHistory(newScreens);
    if (selectedComponentId === id) setSelectedComponentId(null);
  }

  function duplicateComponent(id: string) {
    const newScreens = screens.map((screen) => {
      if (screen.id === currentScreenId) {
        const component = screen.components.find((comp) => comp.id === id);
        if (component) {
          return {
            ...screen,
            components: [
              ...screen.components,
              {
                ...component,
                id: uuidv4(),
                x: component.x + 20,
                y: component.y + 20,
              },
            ],
          };
        }
      }
      return screen;
    });
    updateWithHistory(newScreens);
  }

  return {
    undo,
    redo,
    exportDesign,
    updateComponentProperties,
    deleteComponent,
    duplicateComponent
  };
};
