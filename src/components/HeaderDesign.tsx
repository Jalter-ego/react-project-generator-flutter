import { SignedIn, UserButton } from "@clerk/clerk-react";
import type { Dispatch, SetStateAction } from "react";

interface HeaderDesignProps{
    undo: ()=> void,
    redo: ()=> void,
    saveProject: ()=> void
    exportDesign: ()=> void
    historyIndex: number
    isDragEnabled: Boolean
    setIsDragEnabled: Dispatch<SetStateAction<boolean>>
}

export default function HeaderDesign({
    undo,historyIndex,redo,isDragEnabled,setIsDragEnabled,saveProject,exportDesign
}:HeaderDesignProps){
    return(
        <div className="bg-[#1f1f1f] p-3 flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={undo}
                disabled={historyIndex === 0}
                className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:bg-gray-600 hover:bg-blue-600 transition-colors"
              >
                Undo
              </button>
              <button
                onClick={redo}
                disabled={historyIndex === history.length - 1}
                className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:bg-gray-600 hover:bg-blue-600 transition-colors"
              >
                Redo
              </button>
              <button
                onClick={() => setIsDragEnabled(!isDragEnabled)}
                className={`px-3 py-1 ${isDragEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md transition-colors`}
              >
                {isDragEnabled ? 'Pausar Arrastre' : 'Habilitar Arrastre'}
              </button>
              <button
                onClick={saveProject}
                className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                Save Project
              </button>
              <button
                onClick={exportDesign}
                className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Export JSON
              </button>
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
    )
}