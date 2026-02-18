import Login from "./assets/components/log/Login"
import Profile from "./assets/components/profile/Profile";
import { useState } from "react";
import { Route,Routes } from "react-router";






function App() {


  return (
    <main>
      <Routes>
        <Route index  element = {<Login />} />
        <Route path="/profile" element = {<Profile />} />
      </Routes>
    </main>
  )
}

export default App
