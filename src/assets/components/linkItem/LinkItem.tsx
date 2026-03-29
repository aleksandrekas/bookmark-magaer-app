import "./linkItem.css"
import { useRef, useState,useContext } from "react"
import { useClickaway } from "../utils/useClickaway"
import { Context } from "../utils/ContextProvider"
import fetchWithAuth from "../utils/functions"


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
    pinned:number
}



export default function LinkItem({bookmark}:{bookmark:bookmarkType}){
    const[itemMenu,setMenu] = useState<boolean>(false)
    const [clipboard,setClipboard] = useState<boolean>(false)
    const itemMenuRef = useRef<any>(null)
    const itemBtnRef = useRef<any>(null)
    useClickaway(itemMenuRef,()=>{setMenu(false)},itemBtnRef)
    const {archived,created,description,id,lastVisit,title,url,userId,visitCount,tags,pinned} = bookmark
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
            tags:tags,
            pinned:pinned
        })
    }



    function handleDelete(){
        context?.setDelete({
            open:true,
            bookmarkId:id
        })
    }
    


    function handleArchive(){
        context?.setArchive({
            open:true,
            bookmarkId:id,
            archived:archived
        })
    }


    function copyText(){
        navigator.clipboard.writeText(url)
        setClipboard(true)
    }



    function getOrigin(url:string){
        const link = new URL(url).origin
        const origin = link.split('https://')[1]
        return origin
    }



    async function handleVisit(){
        const currdate = new Date().toISOString()
        try{
            const visitRequest = await  fetchWithAuth('http://localhost:3000/api/edit',{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    visitCount:visitCount + 1 ,
                    lastVisit:currdate,
                    id:id
                })
            })
            console.log(visitRequest)
            context?.setRefresh(!context.refresh)
        }catch(err){
            console.log(err)
        }


    }


    return (
        <div className="itemContainer">
            <header className="itemHeader">
                <div className="logoHolder">
                    <img src="/images/logos/favicon-frontend-mentor.png" alt="" />
                </div>
                <div className="titleHolder">
                    <a href={url} target="_blank" onClick={handleVisit}>{shortenedText(title)}</a>
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
                <img style={{display: archived === 0 ? 'block':'none'}} src="/images/icon-pin.svg" alt="" />
                <div style={{display: archived === 1 ? 'block':'none'}} className="tags archiveStatus">archived</div>
            </footer>
            <div className="itemMenu" style={{display: itemMenu ? 'block':'none'}} ref={itemMenuRef} >
                <ul className="itemMenuList" style={{display: archived === 1 ? "none" : "block" }}>
                    <div  className="listItem" 
                      onClick={() => {
                        
                        handleVisit()
                        window.open(url, "_blank")
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M17.5 7.5v-5m0 0h-5m5 0-6.667 6.667m-2.5-5H6.5c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 6.066 2.5 6.767 2.5 8.167V13.5c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092C4.4 17.5 5.1 17.5 6.5 17.5h5.333c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.093-1.092c.272-.535.272-1.235.272-2.635v-1.833"/></svg>
                        Visit
                    </div>
                    <li className="listItem" onClick={copyText}>
                        {clipboard ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M16.666 5 7.5 14.167 3.333 10"/></svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><g clip-path="url(#a)"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4.167 12.5c-.777 0-1.165 0-1.471-.127a1.67 1.67 0 0 1-.902-.902c-.127-.306-.127-.694-.127-1.471V4.333c0-.933 0-1.4.182-1.756.16-.314.414-.569.728-.729.357-.181.823-.181 1.757-.181H10c.777 0 1.165 0 1.472.127.408.169.732.493.902.902.126.306.126.694.126 1.47m-2.333 14.167h5.5c.933 0 1.4 0 1.757-.181.313-.16.568-.415.728-.729.182-.356.182-.823.182-1.756v-5.5c0-.934 0-1.4-.182-1.757a1.67 1.67 0 0 0-.728-.728C17.067 7.5 16.6 7.5 15.667 7.5h-5.5c-.933 0-1.4 0-1.757.182-.313.16-.568.414-.728.728-.182.357-.182.823-.182 1.757v5.5c0 .933 0 1.4.182 1.756.16.314.415.569.728.729.357.181.824.181 1.757.181"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs></svg>


                        }
                        Copy URL
                    </li>
                    <li className="listItem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="m6.98 13.014-4.713 4.714M9.745 5.535l-1.3 1.3c-.106.107-.16.16-.22.202a1 1 0 0 1-.172.092c-.069.027-.143.042-.29.071l-3.053.611c-.794.159-1.19.238-1.376.447a.83.83 0 0 0-.203.668c.039.277.325.563.897 1.135l5.905 5.905c.572.572.858.858 1.136.897a.83.83 0 0 0 .667-.202c.21-.186.289-.583.447-1.376l.611-3.054c.03-.147.044-.22.071-.29a1 1 0 0 1 .092-.172c.042-.06.096-.113.202-.22l1.3-1.3c.068-.068.102-.102.14-.132a1 1 0 0 1 .104-.07 2 2 0 0 1 .174-.08l2.079-.892c.606-.26.91-.39 1.047-.6a.83.83 0 0 0 .12-.622c-.05-.246-.283-.48-.75-.946l-4.286-4.286c-.466-.466-.7-.7-.946-.75a.83.83 0 0 0-.622.12c-.21.138-.34.441-.6 1.048l-.89 2.078c-.039.088-.058.133-.081.174a1 1 0 0 1-.071.105c-.03.037-.064.071-.132.139"/></svg>
                        Unpin
                    </li>
                    <li className="listItem" onClick={handleEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><g clip-path="url(#a)"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M9.167 3.333h-3.5c-1.4 0-2.1 0-2.635.273a2.5 2.5 0 0 0-1.093 1.092c-.272.535-.272 1.235-.272 2.635v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.093c.535.272 1.235.272 2.635.272h7c1.4 0 2.1 0 2.635-.272a2.5 2.5 0 0 0 1.093-1.093c.272-.535.272-1.235.272-2.635v-3.5m-10 2.5h1.395c.408 0 .612 0 .804-.046q.256-.061.481-.2c.169-.102.313-.246.601-.535l7.969-7.969a1.768 1.768 0 0 0-2.5-2.5l-7.969 7.97c-.288.287-.432.432-.535.6q-.139.225-.2.482c-.046.191-.046.395-.046.803z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs></svg>
                        Edit
                    </li>
                    <li className="listItem" onClick={handleArchive}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M3.334 6.664a2 2 0 0 1-.325-.03 1.67 1.67 0 0 1-1.31-1.309c-.032-.16-.032-.354-.032-.742 0-.387 0-.58.032-.741a1.67 1.67 0 0 1 1.31-1.31c.16-.032.354-.032.741-.032h12.5c.387 0 .581 0 .742.032a1.67 1.67 0 0 1 1.31 1.31c.032.16.032.354.032.741 0 .388 0 .581-.032.742a1.67 1.67 0 0 1-1.31 1.31 2 2 0 0 1-.325.029m-8.333 4.17h3.333M3.334 6.666h13.333V13.5c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092c-.535.273-1.235.273-2.635.273H7.334c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092c-.272-.535-.272-1.235-.272-2.635z"/></svg>
                        Archive
                    </li>
                </ul>
                <ul className="itemMenuList" style={{display: archived === 1 ? "block" : "none" }}>
                    <a href={url} target="_blank" className="listItem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M17.5 7.5v-5m0 0h-5m5 0-6.667 6.667m-2.5-5H6.5c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 6.066 2.5 6.767 2.5 8.167V13.5c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092C4.4 17.5 5.1 17.5 6.5 17.5h5.333c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.093-1.092c.272-.535.272-1.235.272-2.635v-1.833"/></svg>
                        Visit
                    </a>
                    <li className="listItem" onClick={copyText}>
                        {clipboard ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M16.666 5 7.5 14.167 3.333 10"/></svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><g clip-path="url(#a)"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4.167 12.5c-.777 0-1.165 0-1.471-.127a1.67 1.67 0 0 1-.902-.902c-.127-.306-.127-.694-.127-1.471V4.333c0-.933 0-1.4.182-1.756.16-.314.414-.569.728-.729.357-.181.823-.181 1.757-.181H10c.777 0 1.165 0 1.472.127.408.169.732.493.902.902.126.306.126.694.126 1.47m-2.333 14.167h5.5c.933 0 1.4 0 1.757-.181.313-.16.568-.415.728-.729.182-.356.182-.823.182-1.756v-5.5c0-.934 0-1.4-.182-1.757a1.67 1.67 0 0 0-.728-.728C17.067 7.5 16.6 7.5 15.667 7.5h-5.5c-.933 0-1.4 0-1.757.182-.313.16-.568.414-.728.728-.182.357-.182.823-.182 1.757v5.5c0 .933 0 1.4.182 1.756.16.314.415.569.728.729.357.181.824.181 1.757.181"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs></svg>


                        }
                        Copy URL
                    </li>
                    <li className="listItem" onClick={handleArchive} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M1.667 8.333S3.337 6.057 4.695 4.7a7.5 7.5 0 1 1-1.902 7.385m-1.126-3.75v-5m0 5h5"/></svg>
                        Unarchive
                    </li>
                    <li className="listItem" onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M7.5 2.5h5M2.5 5h15m-1.667 0-.584 8.766c-.088 1.315-.132 1.973-.416 2.472a2.5 2.5 0 0 1-1.082 1.012c-.516.25-1.175.25-2.493.25H8.742c-1.318 0-1.977 0-2.493-.25a2.5 2.5 0 0 1-1.082-1.012c-.284-.5-.328-1.157-.416-2.472L4.167 5m4.166 3.75v4.167m3.334-4.167v4.167"/></svg>
                        Delete Permanently
                    </li>
                </ul>
            </div>
        </div>
    )
}





