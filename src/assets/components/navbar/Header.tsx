import './header.css'
import { useEffect, useRef, useState } from 'react'
import { useClickaway } from '../../useClickaway'

export default function Header({sideBarSetter}:{sideBarSetter:React.Dispatch<React.SetStateAction<boolean>>}){
    const [profile,setProfile] = useState<boolean>(false)
    const [theme,setTheme] = useState<string>('light')
    const profileRef = useRef<any>(null)


    function toggleTheme(){
        if(theme === 'light'){
            setTheme('dark')
        }else{ 
            setTheme('light')
        }
    }

    useEffect(()=>{
        if(theme === 'light'){
            document.documentElement.removeAttribute("data-theme")
        }else{
            document.documentElement.setAttribute("data-theme",theme)
        }
    },[theme])

    useClickaway(profileRef,()=>{setProfile(false)})




    return (
        <header className='headerContainer'>
            <div className="left">
                <button onClick={()=>{sideBarSetter(true)}} className="headerBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M2.5 10h15m-15-5h15m-15 10h15"/></svg>
                </button>
                <div className="searchbar">
                    <img src="/images/icon-search.svg" alt="search_logo" className="searchLogo" />
                    <input type="text" placeholder='Search by title...'/>
                </div>
            </div>
            <div className="right">
                <button className='addBookmark'>
                    <img src="/images/icon-add.svg" alt="" className="addlogo" />
                    <p>Add Bookmark</p>
                </button>
                <div onClick={()=>{setProfile(!profile )}} className="avatar">
                    <img className='avatarImg' src="/images/logos/image-avatar.webp" alt="" />
                </div>
            </div>
            <div className="profile" style={{display: profile ? 'block' : 'none'}} ref={profileRef}>
                <div className="account">
                    <img src="/images/logos/image-avatar.webp" alt="" />
                    <div className="info">
                        <h4>Emily Carter</h4>
                        <p>emily010@gmail.com</p>
                    </div>
                </div>
                <div className="theme">
                    <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><g stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" clip-path="url(#a)"><path d="M1.667 10A8.333 8.333 0 0 0 10 18.333a2.5 2.5 0 0 0 2.5-2.5v-.416c0-.387 0-.58.022-.743a2.5 2.5 0 0 1 2.152-2.153c.162-.021.356-.021.743-.021h.417a2.5 2.5 0 0 0 2.5-2.5 8.333 8.333 0 0 0-16.667 0"/><path d="M5.834 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666M13.334 7.5a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667M8.334 6.667a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs></svg>
                        Theme
                    </h3>

                    <button onClick={toggleTheme} className="themeToggle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><g clip-path="url(#a)"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M10 1.667v1.666m0 13.334v1.666M3.334 10H1.667m3.595-4.738L4.084 4.083m10.655 1.179 1.178-1.179M5.262 14.742 4.084 15.92m10.655-1.178 1.178 1.178M18.334 10h-1.667m-2.5 0a4.167 4.167 0 1 1-8.333 0 4.167 4.167 0 0 1 8.333 0"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs></svg> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><g clip-path="url(#a)"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.667" d="M18.296 10.797a6.667 6.667 0 1 1-9.092-9.093 8.334 8.334 0 1 0 9.092 9.093"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs></svg>
                        <div className={theme === 'light' ? 'selected':'selected switch'}></div>
                    </button>
                </div>
                    <button className="logout">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13.333 14.167 17.5 10m0 0-4.167-4.167M17.5 10h-10m0-7.5h-1c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 4.4 2.5 5.1 2.5 6.5v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092C4.4 17.5 5.1 17.5 6.5 17.5h1"/></svg>
                        <h3>Logout</h3>
                    </button>
            </div>
        </header>
    )
}   