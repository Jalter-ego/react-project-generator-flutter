// components/ComponentLibrary.tsx

import { IconLock, IconMenuDeep, IconSearch, IconUser } from "../assets/Icons";

export function Button() {
  return (
    <button className="bg-cyan-500 text-white w-32 h-8 rounded-xl font-semibold
        cursor-pointer">
      Botón
    </button>
  );
}

export function TextField() {
  return (
    <input
      className="w-58 h-8 rounded-xl border border-zinc-300 px-2 text-black"
      placeholder="Campo de texto"
    />
  );
}

export function Checkbox(){
  return(
    <input type="checkbox" 
      className="w-4 h-4 bg-white"
    />
  )
}

export function AppBar1(){
  return(
    <nav className="w-[300px] h-8 flex items-center justify-between text-zinc-700
      px-4">
      <IconMenuDeep/>
      <IconUser/>
    </nav>
  )
}

// Diccionario de componentes para renderizado dinámico
export const componentMap: Record<string, () => React.JSX.Element> = {
  button: Button,
  textfield: TextField,
  checkbox: Checkbox,
  appbar1:AppBar1,
  iconUser: IconUser,
  iconSearch: IconSearch,
  iconLock: IconLock,
  iconMenuDeep: IconMenuDeep
};
