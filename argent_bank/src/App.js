import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home";
import { Signin } from "./pages/Signin";
import { User } from "./pages/User";
import { updateUser } from "./store";
import { login } from "./utils/login";
import { logout } from "./utils/logout";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    if((sessionStorage.getItem("token"))){
        login(dispatch, updateUser, sessionStorage.getItem("token"))
        return
    }
    if (localStorage.getItem("token")) {
        login(dispatch, updateUser, localStorage.getItem("token"))
        return
    }
    logout(dispatch, updateUser)
  }, [dispatch])

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<Signin/>}/>
          <Route path="/user" element={<User/>}/>
        </Routes>
      </div>
  );
}

export default App;
