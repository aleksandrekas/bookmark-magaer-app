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
}

type BookmarkStateType = {
    bookmarks:BookmarkType[]
    archived:BookmarkType[]
}





export default function itemsHolder(){
    const [bookmark,setBookmarks] = useState<BookmarkStateType>({
        bookmarks:[],
        archived:[]
    })

    const container = useRef<any>(null)
    const context = useContext(Context)
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
            bookmarks:activeBookmarks,
            archived:archivedBookmarks
        })


    

    },[context?.bookmarks])
        

    return(
        <>
            <div className="itemHolder" style={{display: context?.itemsHolder === 'home' ? 'block': 'none'}}  ref={container}>
                {bookmark.bookmarks.length === 0 ? (
                    <div className="noBookmarksDiv">No bookmarks</div>
                ):(
                    bookmark.bookmarks.map((item,index)=>(
                        <LinkItem bookmark={item} key={index}/>
                    )) 
                )}

            </div>
            <div className="itemHolder" style={{display: context?.itemsHolder === 'archived' ? 'block': 'none'}}   ref={container}>
                {bookmark.archived.length === 0 ? (
                    <div className="noBookmarksDiv">No archived bookmarks</div>
                ):(
                    bookmark.archived.map((item,index)=>(
                        <LinkItem bookmark={item} key={index}/>
                    )) 
                )}
            </div>
        </>
    )
}


