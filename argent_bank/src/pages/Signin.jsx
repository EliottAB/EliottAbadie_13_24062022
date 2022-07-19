import React from "react"
import { Navigate } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { SigninForm } from "../components/SigninForm"
import "../css/pages/signin.css"

export function Signin(){

    return(
        !localStorage.getItem("token") && !sessionStorage.getItem("token") ?
        <React.Fragment>
            <Header/>
            <main className="main bg-dark">
                <SigninForm/>
            </main>
            <Footer/>
        </React.Fragment>
        : <Navigate replace to="/user"/>
    )

}