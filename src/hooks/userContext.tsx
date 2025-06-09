import type { User } from "@/services/auth.service";
import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user,setUser] = useState<User | undefined>(undefined)

  return (
    <UserContext.Provider value={{user,setUser
     }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = (): UserContextType => {
  const contex = useContext(UserContext)
  if (!contex)
    throw new Error('')
  return contex
}