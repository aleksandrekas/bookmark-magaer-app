import SideBar from "../sideBar/Sidebar"
import { useEffect, useState, useContext } from "react"
import "./profile.css"
import Header from "../navbar/Header"
import ItemsHolder from "../itemsholder/ItemsHolder"
import Filter from "../filter/Filter"
import EditBookmark from "../eidtBookmark/EditBookmark"
import AddBookmark from "../addBookmark/AddBookmark"
import { Context } from "../utils/ContextProvider"
import { useNavigate } from "react-router"
import Archive from "../windows/Archive"
import Delete from "../windows/Delete"
import request from "../utils/functions"



export default function Profile() {
    const context = useContext(Context)
    const navigate = useNavigate()

    const [sidebarState, setSidebar] = useState(false)
    const [sort, setSort] = useState("recently added")

    

    async function fetchData(){
        try{
            const data = await request("api/bookmarks",{
                method:"GET"
            })
            
            const {userEmail,userId,userName,res} = data
            
            context?.setUser({
                userEmail:userEmail,
                userId:userId,
                userName:userName
            })

            if(res){
                context?.setBookmarks(res)
            }else{
                context?.setBookmarks([])
            }

        }catch(err){
            navigate('/')
        }

    } 











    useEffect(() => {
        fetchData()
    }, [context?.refresh])

    return (
        <div className="profileContainer">
            <SideBar state={sidebarState} stateSetter={setSidebar} />

            <div className="profileContent">
                <Header
                    sideBarSetter={setSidebar}
                />

                <Filter setSort={setSort} />

                <ItemsHolder sort={sort} />
            </div>

            <AddBookmark />
            <EditBookmark />
            <Archive />
            <Delete />
        </div>
    )
}