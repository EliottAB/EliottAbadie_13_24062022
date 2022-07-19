import React from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import "../css/pages/user.css"
import { Balance } from "../components/Balance"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { updateUser } from "../store"
import { Navigate } from "react-router-dom"

export function User(){

    const user = useSelector(state => state.user)
    const [editmode, edit] = useState(false)
    const [firstName, changeFirstName] = useState("")
    const [lastName, changeLastName] = useState("")
    const [wrongFirstName, setFirstNameError] = useState()
    const [wrongLastName, setLastNameError] = useState()
    const dispatch = useDispatch()

    function cancel(){
        changeFirstName("")
        changeLastName("")
        setFirstNameError(null)
        setLastNameError(null)
        edit(false)
    }

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && editmode === false) {
            cancel()
        }
    })

    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && editmode === true) {
            editName()
        }
    })

    function checkname(name, setError){
        if (name.length < 3) {
            setError("should have 3 or more characters")   
        }else{
            if (name.match(/[^A-zÀ-ú]/)) {
                setError("your name include something wrong")
            }else{
                setError(null)
            }
        }
    }

    function editName(){
        if (firstName.length > 2 && lastName.length > 2 && !firstName.match(/[^A-zÀ-ú]/) && !lastName.match(/[^A-zÀ-ú]/)) {
            const JWTtoken = (localStorage.getItem("token") === null) ? sessionStorage.getItem("token") : localStorage.getItem("token")
            fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + JWTtoken
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.message !== "Successfully updated user profile data"){
                    console.log("Une erreur s'est produite")
                }else{
                    dispatch(updateUser({
                        firstName: firstName,
                        lastName: lastName,
                        email: user.email,
                        isloged: true
                    }))
                    cancel()
                }
            })
            .catch((error) => {
                console.log(error)
            });
        }else{
            checkname(firstName, setFirstNameError)
            checkname(lastName, setLastNameError)
        }
    }

    return(
        localStorage.getItem("token") || sessionStorage.getItem("token") ?
        <React.Fragment>
            <Header/>
            <main className="main bg-dark">
                <div className="header">
                        {
                            editmode ?
                        <React.Fragment>
                            <h1>Welcome back<br /></h1>
                            <form className="edit-name">
                                <div className="edit-firstname">
                                    <input type="text" placeholder={user.firstName} onChange={(e) => changeFirstName(e.target.value)} value={firstName} maxLength={20}/>
                                    {wrongFirstName ? <p className="wrongname">{wrongFirstName}</p> : null}
                                </div>
                                <div className="edit-lastname">
                                    <input type="text" placeholder={user.lastName} onChange={(e) => changeLastName(e.target.value)} value={lastName} maxLength={20}/>
                                    {wrongLastName ? <p className="wrongname">{wrongLastName}</p> : null}
                                </div>
                                    <button className="edit-button cancel" type="button" onClick={cancel}>cancel</button>
                                    <button className="edit-button confirm" type="button" onClick={editName}>confirm</button>
                            </form>
                        </React.Fragment>

                        : 
                        <React.Fragment>
                            <h1>Welcome back<br />
                                {`${user.firstName} ${user.lastName} !`}
                            </h1>
                            <button className="edit-button" onClick={() => edit(true)}>Edit name</button>
                        </React.Fragment>
                        }
                </div>
                <h2 className="sr-only">Accounts</h2>
                <Balance title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance"/>
                <Balance title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance"/>
                <Balance title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance"/>
            </main>
            <Footer/>
        </React.Fragment>
        : <Navigate replace to="/sign-in"/>
    )

}