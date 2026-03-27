import SideBar from "../sideBar/Sidebar"
import { useEffect, useState,useContext } from "react"
import "./profile.css"
import Header from "../navbar/Header"
import ItemsHolder from "../itemsholder/ItemsHolder"
import Filter from '../filter/Filter';
import EditBookmark from "../eidtBookmark/EditBookmark"
import AddBookmark from '../addBookmark/AddBookmark'
import { Context } from "../utils/ContextProvider"
import fetchWithAuth from "../utils/functions"
import { useNavigate } from "react-router"
import Archive from "../windows/Archive"
import Delete from "../windows/Delete"

export default function Profile(){
    const context = useContext(Context)
    const navigate = useNavigate()

    async function fetchData(){
        try{
            const data = await fetchWithAuth("http://localhost:3000/api/bookmarks",{
                method:"GET"
            })
            
            const {userEmail,userId,userName,res} = data
            context?.setUser({
                userEmail:userEmail,
                userId:userId,
                userName:userName
            })
            context?.setBookmarks(res)

        }catch(err){
            navigate('/')
        }

    } 




    useEffect(()=>{
        fetchData()
    },[context?.refresh])






    const [sidebarState,setSidebar] = useState(false)
    return(
        <div className="profileContainer">           
                <SideBar state={sidebarState} stateSetter={setSidebar}/>
                <div className="profileContent">
                    <Header sideBarSetter={setSidebar} />
                    <Filter />
                    <ItemsHolder /> 
                </div>
                <AddBookmark />
                <EditBookmark />
                <Archive />
                <Delete />
        </div>
    )
}