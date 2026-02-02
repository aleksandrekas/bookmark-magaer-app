import Login from "./assets/components/log/Login"
import Header from "./assets/components/navbar/Header"
import SideBar from "./assets/components/sideBar/Sidebar"
import ItemsHolder from "./assets/components/itemsholder/ItemsHolder"
import Filter from "./assets/components/filter/Filter";
import { useState } from "react";
import Delete from "./assets/components/windows/Delete";
import Archive from "./assets/components/windows/Archive";
import Unarchive from "./assets/components/windows/Unarchive";
import AddBookmark from "./assets/components/addBookmark/AddBookmark";






function App() {
  const [sidebarState,setSidebar] = useState(false)


  return (
    <main>
      <SideBar state={sidebarState} stateSetter={setSidebar} />
      <div className="container">
        <Header sideBarSetter={setSidebar}  />
        {/* <Filter /> */}
        <ItemsHolder />
      </div>
      <div className={sidebarState ? 'sidebarOverlay overlayOn' : 'sidebarOverlay'}></div>
      {/* <AddBookmark /> */}
    </main>
  )
}

export default App
