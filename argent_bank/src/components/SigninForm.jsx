import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../store"
import "../css/components/signinform.css"
import { login } from "../login"

export function SigninForm(){

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [userError, setUserError] = useState()
    const [passwordError, setPasswordError] = useState()
    let rememberMe = false
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleMessage(message){
        switch (message) {
            case "Error: Password is invalid":
                setPasswordError(message.split("Error: ")[1])
                setUserError(null)
                break;
            case "Error: User not found!":
                setUserError(message.split("Error: ")[1])
                setPasswordError(null)
                break;
            case "User successfully logged in":
                setUserError(null)
                setPasswordError(null)
                break;
            default:
                break;
        }
    }

    function authentification(){
        fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            handleMessage(data.message)
            if (data.body && data.body.token) {
                if (rememberMe) {
                    localStorage.setItem("token", data.body.token)
                }else{
                    sessionStorage.setItem("token", data.body.token)
                }
                login(dispatch, updateUser, data.body.token)
                return navigate("/user")
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    return(
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={user} onChange={(event) => setUser(event.target.value)}/>
                { userError ? <p className="incorrect">{userError}</p> : null}
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                { passwordError ? <p className="incorrect">{passwordError}</p> : null}
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" onChange={(event) => {rememberMe = !rememberMe}}/>
                <label htmlFor="remember-me">Remember me</label>
            </div>
                <button className="sign-in-button" type="button" onClick={authentification}>Sign In</button>
            </form>
        </section>
    )

}