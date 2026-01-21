import './header.css'



export default function Header(){
    return (
        <header className='headerContainer'>
            <div className="left">
                <button className="headerBtn">
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
        </header>
    )
}