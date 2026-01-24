import Login from "./assets/components/log/Login"
import LinkItem from "./assets/components/linkItem/LinkItem"
import Header from "./assets/components/navbar/Header"
import SideBar from "./assets/components/sideBar/Sidebar"
import ItemsHolder from "./assets/components/itemsholder/ItemsHolder"
import Filter from "./assets/components/filter/Filter";
function App() {

  return (
    <main>
      <SideBar />
      <div className="container">
        <Header />
        <Filter />
        <ItemsHolder />
      </div>
    </main>
  )
}

export default App
