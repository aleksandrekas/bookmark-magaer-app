import "./linkItem.css"
import { useState } from "react"



export default function LinkItem(){
    const[itemMenu,setMenu] = useState<boolean>(false)



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
                    <img  src="/images/icon-menu-bookmark.svg" alt="" />
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
            <div className="itemMenu" style={{display: itemMenu ? 'block':'none'}}>
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