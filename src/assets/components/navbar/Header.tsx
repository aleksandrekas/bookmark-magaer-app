import './header.css'
import { useEffect, useState } from 'react'


export default function Header({sideBarSetter}:{sideBarSetter:React.Dispatch<React.SetStateAction<boolean>>}){

    const [theme,setTheme] = useState<string>('light')



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


    return (
        <header className='headerContainer'>
            <div className="left">
                <button onClick={()=>{sideBarSetter(true)}} className="headerBtn">
                    <img src="/images/icon-menu-hamburger.svg" alt="hamburger" className="btnImg" />
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
                <div className="avatar">
                    <img className='avatarImg' src="/images/logos/image-avatar.webp" alt="" />
                </div>
            </div>
            <div className="profile">
                <div className="theme">
                    <h3>
                        <img src="/images/icon-theme.svg" alt="theme" />
                        Theme
                    </h3>

                    <button onClick={toggleTheme} className="themeToggle">
                        <img src="/images/icon-light-theme.svg" alt="light-theme" className="toggleIcons" />
                        <img src="/images/icon-dark-theme.svg" alt="dark-theme" className="toggleIcons" />
                        <div className={theme === 'light' ? 'selected':'selected switch'}></div>
                    </button>
                </div>
            </div>
        </header>
    )
} 