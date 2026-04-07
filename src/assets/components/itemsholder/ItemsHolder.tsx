import './itemsHolder.css';
import LinkItem from '../linkItem/LinkItem';
import { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../utils/ContextProvider';


type BookmarkType = {
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
    pinned:number
    icon:string
}

type BookmarkStateType = {
    bookmarks:BookmarkType[]
    archived:BookmarkType[]
}





export default function itemsHolder({sort}:{sort:string}){
    const [bookmark,setBookmarks] = useState<BookmarkStateType>({
        bookmarks:[],
        archived:[]
    })

    const container = useRef<any>(null)
    const context = useContext(Context)

    function sortBookmarks(arr:BookmarkType[],type:string){
        if(type === 'recently added'){
            return arr.sort((a,b)=> new Date(b.created).getTime() - new Date(a.created).getTime())
        }else if(type === 'recently visited'){
            return arr.sort((a,b)=> new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
        }else if(type === 'most visited'){
            return arr.sort((a,b)=> b.visitCount - a.visitCount)
        }
    }


    function pinTags(bookmarks:BookmarkType[]){
        const pinned = bookmarks.filter((item)=> item.pinned === 1)
        const notPinned = bookmarks.filter((item)=> item.pinned === 0)
        if(pinned.length === 0) return notPinned
        return [pinned,notPinned].flat()

    }



    function filterByTags(bookmarks:BookmarkType[]){
        if(context?.filterTags.length === 0){
            return bookmarks
        }
        return pinTags(bookmarks.filter((item)=>item.tags.some(tag => context?.filterTags.includes(tag))))

    }



    useEffect(()=>{
        const element = container.current;
        function adjustHeight(){
            const rect = element.getBoundingClientRect()
            const availableHeight = window.innerHeight - rect.top;
            element.style.height = `${availableHeight}px`;           
        }

        adjustHeight()
        window.addEventListener("resize",adjustHeight)
        return ()=>{
            window.removeEventListener('resize',adjustHeight)
        }
    },[])
    
    useEffect(()=>{
        let activeBookmarks = context?.bookmarks.filter((item) => item.archived === 0) ?? []
        let archivedBookmarks = context?.bookmarks.filter((item) => item.archived === 1) ?? []

        setBookmarks({
            bookmarks:filterByTags(sortBookmarks(activeBookmarks,sort) || []),
            archived:archivedBookmarks
        })
    },[context?.bookmarks,sort,context?.filterTags])
    

    useEffect(()=>{
        console.log(context?.filterTags)
    },[context?.filterTags])

    const ishome = context?.itemsHolder === 'home'
    const currentBookmarks = ishome ? bookmark.bookmarks : bookmark.archived
    const empty = ishome ? 'No bookmarks' : 'No archived bookamrks'


    return(
            <div className="itemHolder"  ref={container}>
                {currentBookmarks.length === 0 ? (
                    <div className="noBookmarksDiv">{empty}</div>
                ):(
                    currentBookmarks.map((item)=>(
                        <LinkItem bookmark={item} key={item.id}/>
                    )) 
                )}
            </div>
    )
}


