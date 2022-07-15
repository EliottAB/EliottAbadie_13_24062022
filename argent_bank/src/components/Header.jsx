import "../css/components/header.css"
import 'font-awesome/css/font-awesome.min.css';
import LOGO from "../img/argentBankLogo.png"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store";
import { useEffect } from "react";

export function Header(){

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    function login(JWTtoken){
        fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + JWTtoken
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.message !== "Successfully got user profile data"){
                console.log("Une erreur s'est produite")
            }else{
                dispatch(updateUser({
                    firstName: data.body.firstName,
                    lastName: data.body.lastName,
                    email: data.body.email,
                    isloged: true
                }))
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        if((sessionStorage.getItem("token"))){
            login(sessionStorage.getItem("token"))
            return
        }
        if (localStorage.getItem("token")) {
            login(localStorage.getItem("token"))
            return
        }
        logout()
    }, [])
    
    function logout(){
        dispatch(updateUser({
            firstName: "",
            lastName: "",
            email: "",
            isloged: false
        }))
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")
    }

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
}