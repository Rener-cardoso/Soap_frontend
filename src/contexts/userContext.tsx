import { UserBoxProps } from "@/components/UserBox";
import { api } from "@/lib/axios";
import { createContext, useState, useEffect, ReactNode, SetStateAction, Dispatch } from "react";

interface UserContextProps {
  userInformation: UserBoxProps[]
  getUserInformation: () => void;
  setUserInformation: Dispatch<SetStateAction<UserBoxProps[]>>
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children}: UserProviderProps) {
  const [userInformation, setUserInformation] = useState<UserBoxProps[]>([]);

    async function getUserInformation() {
      try {
        const response = await api.get("/show")
        setUserInformation(response.data)
      } catch (error) {
        console.log(error)
      }
    } 

  return (
    <UserContext.Provider value={{ userInformation, getUserInformation, setUserInformation }}>
      { children }
    </UserContext.Provider>
  )
}