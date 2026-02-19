
import Login from "./assets/components/log/Login"
import Profile from "./assets/components/profile/Profile";
import { Route,Routes,useNavigate } from "react-router";
import AddBookmark from "./assets/components/addBookmark/AddBookmark";






function App() {

  return (
    <main>
      {/* <Routes>
        <Route index  element = {<Login />} />
        <Route path="/profile" element = {<Profile />} />
      </Routes> */}
      <AddBookmark />
    </main>
  )
}

export default App
