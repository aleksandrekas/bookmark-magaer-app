import { createContext,useState, } from "react";
import type { ReactNode,Dispatch,SetStateAction } from "react"

type ContextType = {
  addBookmarkWindow: boolean
  setBookmarkWindow: Dispatch<SetStateAction<boolean>>
  user:UserType 
  setUser:Dispatch<SetStateAction<UserType>>
}

type UserType = {
    userEmail : string
    userId: number
    userName: string
}

export const Context = createContext<ContextType | null>(null);



export default function ContextProvider({ children }:{ children:ReactNode }){
    const [addBookmarkWindow,setBookmarkWindow] = useState<boolean>(false)
    const [user,setUser] = useState<UserType>({
        userEmail:'',
        userId:0,
        userName:''
    })
    return (
        <Context.Provider value={{addBookmarkWindow,setBookmarkWindow,user, setUser}}>
            {children}
        </Context.Provider>
    )
}