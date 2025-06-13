import type {  ScreenType } from "@/types/CanvasItem";
import type { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from 'uuid';

interface FunctionsAppProps {
  screens: ScreenType[];
  updateWithHistory: (newScreens: ScreenType[])=> void
  setSelectedComponentId: Dispatch<SetStateAction<string|null>>
  setCurrentScreenId: Dispatch<SetStateAction<string>>
}

export const functionsAppScreens = ({
  screens,
  updateWithHistory,
  setSelectedComponentId,
  setCurrentScreenId,
}: FunctionsAppProps) => {
    const createNewScreen = () => {
        const newScreenId = uuidv4();
        const newScreens = [
          ...screens,
          {
            id: newScreenId,
            name: `Pantalla ${screens.length + 1}`,
            components: [],
          },
        ];
        updateWithHistory(newScreens);
        setCurrentScreenId(newScreenId);
      };
    
      const navigateToScreen = (screenId: string) => {
        if (screens.some(screen => screen.id === screenId)) {
          setCurrentScreenId(screenId);
          setSelectedComponentId(null);
        }
      };
    
      const renameScreen = (id: string, newName: string) => {
        const newScreens = screens.map(screen => {
          if (screen.id === id) {
            return { ...screen, name: newName };
          }
          return screen;
        });
        updateWithHistory(newScreens);
      };
    
      const deleteScreen = (id: string) => {
        if (screens.length <= 1) {
          alert("Debe haber al menos una pantalla.");
          return;
        }
        const filteredScreens = screens.filter(screen => screen.id !== id);
        const nextScreen = filteredScreens[0];
        updateWithHistory(filteredScreens);
        setCurrentScreenId(nextScreen.id);
      };
    
  return {
    createNewScreen,
    deleteScreen,
    renameScreen,
    navigateToScreen
  };
};
