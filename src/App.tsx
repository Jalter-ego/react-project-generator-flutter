import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { items } from './assets/itemsComponents';
import FloatingChatbot from './components/chatbot/FloatingChatbot';
import { DropZone } from './components/DropZone';
import HeaderDesign from './components/HeaderDesign';
import SidebarComponents from './components/SidebarComponents';
import SidebarPrimary from './components/SidebarPrimary';
import { functionsApp } from './lib/functionsApp';
import { fetchGenerateProyect, fetchProjectById, fetchUpdateProyect, type UpdateProject } from './services/figma.service';
import { socketService } from './services/socket.service';
import type { ScreenType } from './types/CanvasItem';
import { functionsAppScreens } from './lib/functionsAppScreens';
import { defaultProperties } from './constants/defaultProperties';
import { useUserContext } from './hooks/userContext';


export default function App() {
  const { id } = useParams();
  const { user } = useUserContext()
  const [searchParams] = useSearchParams();
  const editKey = searchParams.get('editKey') || '';
  const [project, setProject] = useState<UpdateProject | undefined>(undefined)
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
  const [isAccessDenied, setIsAccessDenied] = useState(false);

  const currentScreen = screens.find(screen => screen.id === currentScreenId) || screens[0];

  const saveToLocalStorage = debounce((screens: ScreenType[]) => {
    localStorage.setItem('design-screens', JSON.stringify(screens));
  }, 500);
  const lastRemoteScreens = useRef<ScreenType[] | null>(null);

  function areScreensEqual(a: ScreenType[], b: ScreenType[]) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  const shareProjectLink = () => {
    if (!id) return;
    const url = `${window.location.origin}/projects/${id}?editKey=${project?.editKey ?? ''}`;
    navigator.clipboard.writeText(url)
      .then(() => toast('📋 Enlace copiado al portapapeles'))
      .catch(() => alert('Error al copiar el enlace'));
  };
  const screensRef = useRef<ScreenType[]>(screens);
  // Actualiza la referencia siempre que cambie `screens`
  useEffect(() => {
    screensRef.current = screens;
  }, [screens]);

  // Escucha eventos del socket
  useEffect(() => {
    if (!id) return;

    socketService.connect();
    socketService.joinRoom(id, editKey || project?.editKey || '', user?.id);

    socketService.onCanvasUpdated((data) => {
      console.log('📥 Recibido canvas-updated desde servidor', data);
      if (!areScreensEqual(data, screensRef.current)) {
        console.log('🔁 Aplicando updateScreensFromJSON');
        lastRemoteScreens.current = data;
        updateScreensFromJSON(data);
      } else {
        console.log('⚠️ Estado recibido es igual al actual, no se actualiza');
      }
    });

    socketService.onCanvasUpdated((data) => {
      if (isAccessDenied) return;
      console.log('📥 Recibido canvas-updated desde servidor', data);
      if (!areScreensEqual(data, screensRef.current)) {
        console.log('🔁 Aplicando updateScreensFromJSON');
        lastRemoteScreens.current = data;
        updateScreensFromJSON(data);
      }
    });

    socketService.on('access-denied', (data) => {
      setIsAccessDenied(true);
      setIsDragEnabled(false);
      toast.error(data.message || 'Access denied: Invalid edit key');
    });

    return () => {
      socketService.offCanvasUpdated();
      socketService.disconnect();
    };
  }, [id, editKey, project?.editKey, user?.id]);

  useEffect(() => {
    if (id && lastRemoteScreens.current && !areScreensEqual(screens, lastRemoteScreens.current)) {
      if (isAccessDenied) return;
      console.log('🛰 Enviando update-canvas', { id, screens });
      socketService.sendCanvasUpdate(id, screens);
    }
  }, [screens,isAccessDenied]);

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
      //console.log(data);

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
      const updateProyect: UpdateProject = {
        name: project.name,
        userId: project.userId,
        editKey: project.editKey,
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


  const { undo, redo, exportDesign, deleteComponent, duplicateComponent, updateComponentProperties } = functionsApp
    ({
      historyIndex, setHistoryIndex, setScreens, history, screens
      , currentScreenId, updateWithHistory, selectedComponentId, setSelectedComponentId
    })

  const { createNewScreen, deleteScreen, navigateToScreen, renameScreen } = functionsAppScreens
    ({ screens, setCurrentScreenId, setSelectedComponentId, updateWithHistory })

  const exportToFlutter = async () => {
    try {
      await fetchGenerateProyect(screens)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {isAccessDenied && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-red-600 text-white p-4 rounded">
            Access Denied: Invalid edit key. Please check the link or contact the project owner.
          </div>
        </div>
      )}
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
              onShare={shareProjectLink}

            />
          </div>
        </div>
        <FloatingChatbot updateScreensFromJSON={updateScreensFromJSON} />
      </DndContext>
    </div>
  );
}