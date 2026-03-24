import "./linkItem.css"
import { useRef, useState,useContext } from "react"
import { useClickaway } from "../utils/useClickaway"
import { Context } from "../utils/ContextProvider"

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



export default function LinkItem({bookmark}:{bookmark:bookmarkType}){
    const[itemMenu,setMenu] = useState<boolean>(false)
    const itemMenuRef = useRef<any>(null)
    const itemBtnRef = useRef<any>(null)
    useClickaway(itemMenuRef,()=>{setMenu(false)},itemBtnRef)
    const {archived,created,description,id,lastVisit,title,url,userId,visitCount,tags} = bookmark
    const context = useContext(Context)
    function shortenedText(text:string){
        if(text.length <= 18){
            return text
        }else{
            return `${text.slice(0,18)}...`
        }
    }



    function formattedDate(created: string) {
        const currentDate = new Date();
        const createdDate = new Date(created);

        const diff = Math.abs(currentDate.getTime() - createdDate.getTime());

        const oneDay = 1000 * 60 * 60 * 24;
        const oneYear = oneDay * 365;

        if(created === "never"){
            return "never"
        }


        if (diff >= oneYear) {
            return createdDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric"
            });
        }

        return createdDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short"
        });
    }

    function handleEdit(){
        context?.setEdit(true)
        context?.setEditBookmark({
            archived:archived,
            created:created,
            description:description,
            id:id,
            lastVisit:lastVisit,
            title:title,
            url:url,
            userId:userId,
            visitCount:visitCount,
            tags:tags
        })
    }


    

    function getOrigin(url:string){
        const link = new URL(url).origin
        const origin = link.split('https://')[1]
        return origin
    }

    return (
        <div className="itemContainer">
            <header className="itemHeader">
                <div className="logoHolder">
                    <img src="/images/logos/favicon-frontend-mentor.png" alt="" />
                </div>
                <div className="titleHolder">
                    <a href={url} target="_blank">{shortenedText(title)}</a>
                    <p>{getOrigin(url)}</p>
                </div>
                <button onClick={()=>{setMenu(!itemMenu)}} ref={itemBtnRef}  className="itemBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M10 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666M10 5a.833.833 0 1 0 0-1.667A.833.833 0 0 0 10 5M10 16.667A.833.833 0 1 0 10 15a.833.833 0 0 0 0 1.667"/></svg>
                </button>
            </header>
            <section className="description">
                <p className="descriptionP">
                   {description}
                </p>
                <div className="linkItemTags">
                    {tags.map((tag,index)=>(
                        <div className="tags" key={index}>{tag}</div>
                    ))}
                </div>
            </section>
            <footer className="itemFooter">
                <ul className="footerUl">
                    <li id="visits">
                        <img src="/images/icon-visit-count.svg" alt="" />
                        {visitCount}
                    </li>
                    <li id="lastVisited">
                        <img src="/images/icon-last-visited.svg" alt="" />
                        {formattedDate(lastVisit)}
                    </li>
                    <li id="created">
                        <img src="/images/icon-created.svg" alt="" />
                        {formattedDate(created)}
                    </li>
                </ul>
                <img src="/images/icon-pin.svg" alt="" />
            </footer>
            <div className="itemMenu" style={{display: itemMenu ? 'block':'none'}} ref={itemMenuRef}>
                <ul className="itemMenuList">
                    <a href={url} target="_blank" className="listItem">
                        <img src="/images/icon-visit.svg" alt="visit_logo" />
                        Visit
                    </a>
                    <li className="listItem">
                        <img src="/images/icon-copy.svg" alt="copy_logo" />
                        Copy URL
                    </li>
                    <li className="listItem">
                        <img src="/images/icon-unpin.svg" alt="unpin_logo" />
                        Unpin
                    </li>
                    <li className="listItem" onClick={handleEdit}>
                        <img src="/images/icon-edit.svg" alt="edit_icon" />
                        Edit
                    </li>
                    <li className="listItem">
                        <img src="/images/icon-archive.svg" alt="archive_logo" />
                        Archive
                    </li>
                </ul>
            </div>
        </div>
    )
}





function DeleteWindow(){
    return (
        <div className="deleteWindowOverlay">
            <div className="deleteWindow">
                <h2>Delete Bookmark</h2>
                <p>are you sure you want to delete this Bookmark?</p>
                <div className="buttons">
                    <button className="cancel">Cancel</button>
                    <button className="remove">Delete Permanently</button>
                </div>
            </div>
        </div>
    )
}