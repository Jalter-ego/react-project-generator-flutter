import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { items } from './assets/itemsComponents';
import { urlimage, urlImageUser } from './assets/urlImage';
import FloatingChatbot from './components/chatbot/FloatingChatbot';
import { DropZone } from './components/DropZone';
import HeaderDesign from './components/HeaderDesign';
import { data, header } from './components/library/Table';
import SidebarComponents from './components/SidebarComponents';
import SidebarPrimary from './components/SidebarPrimary';
import { dataCombobox } from './constants/dataCombobox';
import { dataSidebar } from './constants/dataSidebar';
import { functionsApp } from './lib/functionsApp';
import { fetchGenerateProyect, fetchProjectById, fetchUpdateProyect, type CreateProject } from './services/figma.service';
import type { ComponentInstance, ScreenType } from './types/CanvasItem';

const defaultProperties: Record<string, ComponentInstance['properties']> = {
  button: { label: 'Botón', bg: '#45def2', width: 128, height: 32, borderRadius: 12, fontSize: 16 },
  textfield: { placeholder: 'Campo de texto', width: 232, height: 32, borderRadius: 12 },
  checkbox: { checked: false },
  appbar1: { width: 300, height: 32, bg: '#ffffff' },
  table: { table: { header, data } },
  card: { card: { title: 'Card Title', image: urlimage, description: 'Card Description', price: 0 } },
  container: { bg: '#e37', width: 300, height: 200, borderRadius: 12 },
  label: { label: "Etiqueta", fontSize: 16, colorFont: "#000000" },
  image: { image: urlimage, width: 120, height: 120, borderRadius: 12, },
  combobox: { combobox: dataCombobox },
  switch: { checked: false },
  radio: { checked: false },
  chip: { label: 'Input Chips', bg: '#6366F1', icon: 'I', },
  circleavatar: { image: urlImageUser, size: 80, borderColor: "#ffffff" },
  slider: { value: 40, min: 0, max: 100, step: 10 },
  listtilelist: {
    list: [{ icon: "IconUser", title: "Usuario 1", subtitle: "Subdetalle", showCheckbox: true, checked: false, },],
  },
  togglebuttons: { buttons: [{ icon: "IconHeart" }, { icon: "IconUser" },], initialActive: 0 },
  badge: { label: "3", bg: "#ff3b30", position: "top-right", icon: "IconUser", text: "👽" },
  sidebar: { sidebar: dataSidebar }
};

export default function App() {
  const { id } = useParams();
  const [project, setProject] = useState<CreateProject | undefined>(undefined)
  const [screens, setScreens] = useState<ScreenType[]>(() => {
    const saved = localStorage.getItem('design-screens');
    return saved
      ? JSON.parse(saved)
      : [
        {
          id: 'home',
          name: 'Pantalla Principal',
          components: [],
        },
      ];
  });
  const [currentScreenId, setCurrentScreenId] = useState('home');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [history, setHistory] = useState<ScreenType[][]>([screens]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isDragEnabled, setIsDragEnabled] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const currentScreen = screens.find(screen => screen.id === currentScreenId) || screens[0];

  const saveToLocalStorage = debounce((screens: ScreenType[]) => {
    localStorage.setItem('design-screens', JSON.stringify(screens));
  }, 500);

  function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func(...args);
        timeout = null;
      }, wait);
    };
  }

  useEffect(() => {
    saveToLocalStorage(screens);
  }, [screens]);

  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [screens]);

  useEffect(() => {
    if (id) {
      fetchDataProject();
    }
  }, [id]);

  const fetchDataProject = async () => {
    if (!id) {
      alert('No project ID provided. Please select a project.');
      return;
    }
    if (hasUnsavedChanges && !confirm('You have unsaved changes. Load project anyway?')) {
      return;
    }
    try {
      const data = await fetchProjectById(id);
      console.log(data);

      setProject(data)
      if (data?.screens && data.screens.length > 0) {
        updateScreensFromJSON(data.screens);
      } else {
        const defaultScreen: ScreenType = {
          id: 'home',
          name: 'Pantalla Principal',
          components: [],
        };
        updateScreensFromJSON([defaultScreen]);
      }
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error fetching project data:', error);
      alert('Failed to load project. Please try again.');
    }
  };

  const saveProject = async () => {
    if (!project || !id) {
      alert('No project selected. Please load a project first.');
      return;
    }

    try {
      const updateProyect: CreateProject = {
        name: project.name,
        userId: project.userId,
        screens: screens
      }
      console.log(updateProyect);


      await fetchUpdateProyect(updateProyect, id)
      setHasUnsavedChanges(false);
      toast('Project saved successfully!');

    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const updateScreensFromJSON = (newScreens: ScreenType[]) => {
    setScreens(newScreens);
    setHistory([newScreens]);
    setHistoryIndex(0);
    setCurrentScreenId(newScreens[0]?.id || 'home');
    setSelectedComponentId(null);
    saveToLocalStorage(newScreens);
  };

  const updateWithHistory = (newScreens: ScreenType[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newScreens);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setScreens(newScreens);
  };

  function handleDragEnd(event: DragEndEvent) {
    if (!isDragEnabled) return;
    const { over, active, delta } = event;

    const isNewComponent = items.includes(active.id as string);

    let newScreens: ScreenType[];

    if (isNewComponent && over?.id === 'dropzone') {
      newScreens = screens.map(screen => {
        if (screen.id === currentScreenId) {
          return {
            ...screen,
            components: [
              ...screen.components,
              {
                id: uuidv4(),
                type: active.id as string,
                x: 50,
                y: 50,
                properties: defaultProperties[active.id as string] || {},
              },
            ],
          };
        }
        return screen;
      });
    } else if (!isNewComponent) {
      newScreens = screens.map(screen => {
        if (screen.id === currentScreenId) {
          return {
            ...screen,
            components: screen.components.map(comp =>
              comp.id === active.id
                ? { ...comp, x: comp.x + delta.x, y: comp.y + delta.y }
                : comp
            ),
          };
        }
        return screen;
      });
    } else {
      return;
    }

    updateWithHistory(newScreens);
  }
  const selectedComponent = currentScreen.components.find(comp => comp.id === selectedComponentId) || null;

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

  const { undo, redo, exportDesign, deleteComponent, duplicateComponent, updateComponentProperties } = functionsApp
    ({
      historyIndex, setHistoryIndex, setScreens, history, screens
      , currentScreenId, updateWithHistory, selectedComponentId, setSelectedComponentId
    })

  const exportToFlutter = async () => {
    try {
      await fetchGenerateProyect(screens)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen">
          <SidebarComponents
            screens={screens}
            currentScreenId={currentScreenId}
            setCurrentScreenId={setCurrentScreenId}
            onCreateNewScreen={createNewScreen}
            onRenameScreen={renameScreen}
            onDeleteScreen={deleteScreen}
          />
        </div>
        <div className="flex items-center justify-between h-screen w-full">
          <div className='grid h-screen w-full'>
            <HeaderDesign
              redo={redo}
              undo={undo}
              exportDesign={exportDesign}
              historyIndex={historyIndex}
              isDragEnabled={isDragEnabled}
              saveProject={saveProject}
              setIsDragEnabled={setIsDragEnabled}
              exportToFlutter={exportToFlutter}
            />
            <DropZone
              components={currentScreen.components}
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
              navigateToScreen={navigateToScreen}
              isDragEnabled={isDragEnabled}
            />
          </div>
          <div className="">
            <SidebarPrimary
              selectedComponent={selectedComponent}
              updateComponentProperties={updateComponentProperties}
              deleteComponent={deleteComponent}
              duplicateComponent={duplicateComponent}
              screens={screens}
              currentScreenId={currentScreenId}
            />
          </div>
        </div>
        <FloatingChatbot updateScreensFromJSON={updateScreensFromJSON} />
      </DndContext>
    </div>
  );
}