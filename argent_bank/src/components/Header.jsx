import "../css/components/header.css"
import 'font-awesome/css/font-awesome.min.css';
import LOGO from "../img/argentBankLogo.png"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store";
import React, { useCallback, useEffect } from "react";
import { login } from "../login";

export const Header = React.memo(() => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const logout = useCallback(() => {
        dispatch(updateUser({
            firstName: "",
            lastName: "",
            email: "",
            isloged: false
        }))
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")
    }, [dispatch])

    useEffect(() => {
        if((sessionStorage.getItem("token"))){
            login(dispatch, updateUser, sessionStorage.getItem("token"))
            return
        }
        if (localStorage.getItem("token")) {
            login(dispatch, updateUser, localStorage.getItem("token"))
            return
        }
        logout()
        
    }, [logout, dispatch])

    return(
        <header>
            <nav className="main-nav">
                <Link to={"/"}>
                    <img
                    className="main-nav-logo-image"
                    src={LOGO}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                {
                    user.isloged ?
                    <div>
                        <Link className="main-nav-item" to="/user">
                            <i className="fa fa-user-circle"></i>
                            {user.firstName}
                        </Link>
                        <Link className="main-nav-item" to="/" onClick={logout}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </div>
                    :
                    user.isloged !== undefined ?
                    <div>
                        <Link to={"/sign-in"} className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    </div>
                    : null
                }
            </nav>
        </header>
    )
})