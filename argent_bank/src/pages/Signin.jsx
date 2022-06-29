import React from "react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { SigninForm } from "../components/SigninForm"
import "../css/pages/signin.css"

export function Signin(){

    return(
        <React.Fragment>
            <Header/>
            <main className="main bg-dark">
                <SigninForm/>
            </main>
            <Footer/>
        </React.Fragment>
    )

}