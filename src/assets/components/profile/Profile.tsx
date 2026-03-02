import SideBar from "../sideBar/Sidebar"
import { useEffect, useState,useContext } from "react"
import "./profile.css"
import Header from "../navbar/Header"
import ItemsHolder from "../itemsholder/ItemsHolder"
import Filter from '../filter/Filter';
import AddBookmark from '../addBookmark/AddBookmark'
import { Context } from "../utils/ContextProvider"
import { useNavigate } from "react-router"


export default function Profile(){
    const context = useContext(Context)
    const navigate = useNavigate()


    async function fetchData(){
        const getData = await fetch("http://localhost:3000/api/bookmarks",{
            method:"GET",
            headers:{
                "Authorization":`bearer ${localStorage.getItem("token")}`
            }
        })

        const getDataResults = await getData.json()
        if(!getData.ok && getData.status === 401){
            const refresh = await fetch("http://localhost:3000/api/refresh",{
                method:"POST",
                credentials:"include"
            })
            const refreshResponse = await refresh.json()
            if(refresh.status === 401){
                console.log('refresh token expired or is invalid')
                navigate('/')
                localStorage.removeItem('token')
                return
            }
            localStorage.setItem('token',refreshResponse.newToken)
            return await fetchData()
        }
        const {userEmail,userId,userName} = getDataResults
        context?.setUser({
            userEmail:userEmail,
            userId:userId,
            userName:userName
        })

    } 




    useEffect(()=>{
        fetchData()
    },[])






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
        </div>
    )
}