import "./linkItem.css"
import { useRef, useState } from "react"
import { useClickaway } from "../../useClickaway"


export default function LinkItem(){
    const[itemMenu,setMenu] = useState<boolean>(false)
    const itemMenuRef = useRef<any>(null)
    useClickaway(itemMenuRef,()=>{setMenu(false)})

    return (
        <div className="itemContainer">
            <header className="itemHeader">
                <div className="logoHolder">
                    <img src="/images/logos/favicon-frontend-mentor.png" alt="" />
                </div>
                <div className="titleHolder">
                    <h2>Frontend Mentor</h2>
                    <p>frontendmentor.io</p>
                </div>
                <button onClick={()=>{setMenu(!itemMenu)}}  className="itemBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M10 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666M10 5a.833.833 0 1 0 0-1.667A.833.833 0 0 0 10 5M10 16.667A.833.833 0 1 0 10 15a.833.833 0 0 0 0 1.667"/></svg>
                </button>
            </header>
            <section className="description">
                <p className="descriptionP">
                    Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.
                </p>
                <div className="tags">
                    <div className="tag">
                        Practice
                    </div>
                    <div className="tag">
                        Practice
                    </div>
                    <div className="tag">
                        Practice
                    </div>
                </div>
            </section>
            <footer className="itemFooter">
                <ul className="footerUl">
                    <li id="visits">
                        <img src="/images/icon-visit-count.svg" alt="" />
                        45
                    </li>
                    <li id="lastVisited">
                        <img src="/images/icon-last-visited.svg" alt="" />
                        23 Sep
                    </li>
                    <li id="created">
                        <img src="/images/icon-created.svg" alt="" />
                        18 Sep
                    </li>
                </ul>
                <img src="/images/icon-pin.svg" alt="" />
            </footer>
            <div className="itemMenu" style={{display: itemMenu ? 'block':'none'}} ref={itemMenuRef}>
                <ul className="itemMenuList">
                    <li className="listItem">
                        <img src="/images/icon-visit.svg" alt="visit_logo" />
                        Visit
                    </li>
                    <li className="listItem">
                        <img src="/images/icon-copy.svg" alt="copy_logo" />
                        Copy URL
                    </li>
                    <li className="listItem">
                        <img src="/images/icon-unpin.svg" alt="unpin_logo" />
                        Unpin
                    </li>
                    <li className="listItem">
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