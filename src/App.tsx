
import Login from "./assets/components/log/Login"
import Profile from "./assets/components/profile/Profile";
import { Route,Routes } from "react-router";
import ContextProvider from "./assets/components/utils/ContextProvider";






function App() {

  return (
    <main>
      <ContextProvider>
        <Routes>
          <Route index  element = {<Login />} />
          <Route path="/profile" element = {<Profile />} />
        </Routes>
      </ContextProvider>
    </main>
  )
}

export default App
