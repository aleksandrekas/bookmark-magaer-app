import Login from "./assets/components/log/Login"
import Header from "./assets/components/navbar/Header"
import SideBar from "./assets/components/sideBar/Sidebar"
import ItemsHolder from "./assets/components/itemsholder/ItemsHolder"
import Filter from "./assets/components/filter/Filter";
import { useState } from "react";







function App() {
  const [sidebarState,setSidebar] = useState(false)


  return (
    <main>
      <SideBar state={sidebarState} stateSetter={setSidebar} />
      <div className="container">
        <Header sideBarSetter={setSidebar}  />
        {/* <Filter /> */}
        {/* <ItemsHolder /> */}
      </div>
      <div className={sidebarState ? 'sidebarOverlay overlayOn' : 'sidebarOverlay'}></div>
    </main>
  )
}

export default App
