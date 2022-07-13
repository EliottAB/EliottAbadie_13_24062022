import React from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import "../css/pages/user.css"
import { Balance } from "../components/Balance"

export function User(){

    return(
        <React.Fragment>
            <Header/>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />Tony Jarvis!</h1>
                    <button className="edit-button">Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <Balance title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance"/>
                <Balance title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance"/>
                <Balance title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance"/>
            </main>
            <Footer/>
        </React.Fragment>
    )

}