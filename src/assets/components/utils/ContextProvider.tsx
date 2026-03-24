import { createContext,useState, } from "react";
import type { ReactNode,Dispatch,SetStateAction } from "react"

type ContextType = {
  addBookmarkWindow: boolean
  editWindow: boolean
  setBookmarkWindow: Dispatch<SetStateAction<boolean>>
  setEdit: Dispatch<SetStateAction<boolean>>
  user:UserType 
  setUser:Dispatch<SetStateAction<UserType>>
  bookmarks:Array<bookmarkType>
  setBookmarks:Dispatch<SetStateAction<bookmarkType[]>>
  refresh:boolean
  setRefresh:Dispatch<SetStateAction<boolean>>
  setEditBookmark:Dispatch<SetStateAction<bookmarkType>>
  editTargetBookmark:bookmarkType
}

type UserType = {
    userEmail : string
    userId: number
    userName: string
}

type bookmarkType = {
    archived:number,
    created:string,
    description:string,
    id:number,
    lastVisit:string ,
    title:string,
    url:string,
    userId:number,
    visitCount:number,
    tags:string[]
}


export const Context = createContext<ContextType | null>(null);



export default function ContextProvider({ children }:{ children:ReactNode }){
    const [addBookmarkWindow,setBookmarkWindow] = useState<boolean>(false)
    const [editWindow,setEdit] = useState<boolean>(false)
    const [editTargetBookmark,setEditBookmark] = useState<bookmarkType>({
            archived:0,
            created:'',
            description:'',
            id:0,
            lastVisit:'',
            title:'',
            url:'',
            userId:0,
            visitCount:0,
            tags:[]
    })
    const [user,setUser] = useState<UserType>({
        userEmail:'',
        userId:0,
        userName:''
    })
    const [bookmarks,setBookmarks] = useState<bookmarkType[]>([])
    const [refresh,setRefresh] = useState<boolean>(true)
    return (
        <Context.Provider value={{addBookmarkWindow,setBookmarkWindow,user,setUser,bookmarks,setBookmarks,refresh,setRefresh,editTargetBookmark,setEditBookmark,editWindow,setEdit}}>
            {children}
        </Context.Provider>
    )
}