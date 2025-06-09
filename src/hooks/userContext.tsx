import type { User } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | undefined
  perfil: string | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  login: (token: string) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user,setUser] = useState<User | undefined>(undefined)
  const [perfil, setPerfil] = useState()

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      decodeUserToken(token); 
    }
  }, []);


  const decodeUserToken = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);  
      console.log(decodedToken);
      
      const user: User = {
        id: decodedToken.user.id,
        name: decodedToken.user.name,
        email: decodedToken.user.email,
      };
      setPerfil(decodedToken.picture)
      setUser(user);  
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const login = (token: string) => {
    localStorage.setItem('jwt', token);
    decodeUserToken(token);  
    console.log(user)
};

  const logout = () => {
    localStorage.removeItem('jwt');
    sessionStorage.clear()
    setUser(undefined);
  };


  return (
    <UserContext.Provider value={{user,setUser,login,logout,perfil
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