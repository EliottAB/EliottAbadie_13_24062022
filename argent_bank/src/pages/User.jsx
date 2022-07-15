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
    const dispatch = useDispatch()

    function cancel(){
        changeFirstName("")
        changeLastName("")
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

    function editName(){
        if (firstName.length > 2 && lastName.length > 2 && !firstName.match(/[^a-zà-ú]/) && !lastName.match(/[^a-zà-ú]/)) {
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
        }
    }

    return(
        localStorage.getItem("token") || sessionStorage.getItem("token") ?
        <React.Fragment>
            <Header/>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />
                        {
                        editmode ?
                        <React.Fragment>
                            <input className="editname-input first" type="text" placeholder={user.firstName} onChange={(e) => changeFirstName(e.target.value)} value={firstName} maxLength={20}/>
                            <input className="editname-input second" type="text" placeholder={user.lastName} onChange={(e) => changeLastName(e.target.value)} value={lastName} maxLength={20}/>
                        </React.Fragment>

                        : `${user.firstName} ${user.lastName} !`
                        }
                    </h1>
                    {
                    editmode ? 
                        <React.Fragment>
                            <button className="cancel-button" onClick={cancel}>cancel</button>
                            <button className="edit-button confirm" onClick={editName}>confirm</button>
                        </React.Fragment>
                    : 
                        <button className="edit-button" onClick={() => edit(true)}>Edit name</button>
                    }
                </div>
                <h2 className="sr-only">Accounts</h2>
                <Balance title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance"/>
                <Balance title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance"/>
                <Balance title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance"/>
            </main>
            <Footer/>
        </React.Fragment>
        : <Navigate to="/sign-in"/>
    )

}