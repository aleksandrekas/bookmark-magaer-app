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
  archive:ArchiveType
  setArchive:Dispatch<SetStateAction<ArchiveType>>
  setHolder:Dispatch<SetStateAction<string>>
  itemsHolder:string
  deleteWindow:DeleteType
  setDelete:Dispatch<SetStateAction<DeleteType>>
  filterTags:string[]
  setFilterTags:Dispatch<SetStateAction<string[]>>
}

type UserType = {
    userEmail : string
    userId: number
    userName: string
}

type bookmarkType = {
    archived:number
    created:string
    description:string
    id:number
    lastVisit:string 
    title:string
    url:string
    userId:number
    visitCount:number
    tags:string[]
    pinned:number
    icon:string
}

type ArchiveType = {
    open:boolean
    bookmarkId:number | null
    archived:number | null
}
type DeleteType = {
    open:boolean
    bookmarkId:number | null
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
            tags:[],
            pinned:0,
            icon:''
    })
    const [user,setUser] = useState<UserType>({
        userEmail:'',
        userId:0,
        userName:''
    })
    const [bookmarks,setBookmarks] = useState<bookmarkType[]>([])
    const [refresh,setRefresh] = useState<boolean>(true)
    const [archive,setArchive] = useState<ArchiveType>({
        open:false,
        bookmarkId:null,
        archived:null
    })
    const [deleteWindow,setDelete] = useState<DeleteType>({
        open:false,
        bookmarkId:null
    })

    const [filterTags,setFilterTags] = useState<string[]>([])


    const [itemsHolder,setHolder] = useState('home')
    return (
        <Context.Provider value={{addBookmarkWindow,setBookmarkWindow,user,setUser,bookmarks,setBookmarks,refresh,setRefresh,editTargetBookmark,setEditBookmark,editWindow,setEdit,archive,setArchive,itemsHolder,setHolder,deleteWindow,setDelete,filterTags,setFilterTags}}>
            {children}
        </Context.Provider>
    )
}