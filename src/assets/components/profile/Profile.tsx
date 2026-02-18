import SideBar from "../sideBar/Sidebar"
import { useState } from "react"
import "./profile.css"
import Header from "../navbar/Header"
import ItemsHolder from "../itemsholder/ItemsHolder"
import Filter from '../filter/Filter';


export default function Profile(){
    const [sidebarState,setSidebar] = useState(false)
    return(
        <div className="profileContainer">
            <SideBar state={sidebarState} stateSetter={setSidebar}/>
            <div className="profileContent">
                <Header sideBarSetter={setSidebar} />
                <Filter />
                <ItemsHolder />
            </div>
        </div>
    )
}