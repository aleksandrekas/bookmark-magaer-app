import { createContext,useState, } from "react";
import type { ReactNode,Dispatch,SetStateAction } from "react"

type ContextType = {
  addBookmarkWindow: boolean
  setBookmarkWindow: Dispatch<SetStateAction<boolean>>
}



export const Context = createContext<ContextType | null>(null);



export default function ContextProvider({ children }:{ children:ReactNode }){
    const [addBookmarkWindow,setBookmarkWindow] = useState<boolean>(false)
    return (
        <Context.Provider value={{addBookmarkWindow,setBookmarkWindow}}>
            {children}
        </Context.Provider>
    )
}