import SideBar from "../sideBar/Sidebar"
import { useEffect, useState } from "react"
import "./profile.css"
import Header from "../navbar/Header"
import ItemsHolder from "../itemsholder/ItemsHolder"
import Filter from '../filter/Filter';
import AddBookmark from '../addBookmark/AddBookmark'
import ContextProvider from "../utils/ContextProvider"


export default function Profile(){
    const token = localStorage.getItem("token")


    async function fetchProfileInfo(){
        const response = await fetch("http://localhost:3000/api/bookmarks",{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })

        if(response.status === 401){
            console.log("401 token expired")
            const refreshResponse = await fetch("http://localhost:3000/api/refresh",{
                method:"POST",
                credentials:"include"
            });
            if(refreshResponse.ok){
                const result = await refreshResponse.json()
                const newToken = result.newToken;

                localStorage.setItem("token",newToken)

                return fetchProfileInfo()
            }else{
                localStorage.removeItem("token")
            }
        }



        const results = await response.json()
        console.log(results)

    }



    useEffect(()=>{
        fetchProfileInfo()
    },[])



    const [sidebarState,setSidebar] = useState(false)
    return(
        <div className="profileContainer">
            <ContextProvider>
                <SideBar state={sidebarState} stateSetter={setSidebar}/>
                <div className="profileContent">
                    <Header sideBarSetter={setSidebar} />
                    <Filter />
                    <ItemsHolder /> 
                </div>
                <AddBookmark />
            </ContextProvider>
        </div>
    )
}