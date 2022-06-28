import React from 'react';
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Feature } from '../components/Feature';
import "../css/pages/home.css"
import backimg from "../img/bank-tree.jpeg"
import chatIcon from "../img/icon-chat.png"
import moneyIcon from "../img/icon-money.png"
import securityIcon from "../img/icon-security.png"

export function Home(){

    return(
        <React.Fragment>
            <Header/>
            <main>
            <div className="hero" style={{backgroundImage: `url(${backimg})`}}>
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>

            <section className="features">
                <h2 className="sr-only">Features</h2>
                <Feature 
                    title="You are our #1 priority" 
                    text="Need to talk to a representative? You can get in touch through our
                    24/7 chat or through a phone call in less than 5 minutes." 
                    image={chatIcon} 
                    imagealt="Chat Icon"
                />
                <Feature 
                    title="More savings means higher rates" 
                    text="The more you save with us, the higher your interest rate will be!" 
                    image={moneyIcon} 
                    imagealt="Money Icon"
                />
                <Feature 
                    title="Security you can trust" 
                    text="We use top of the line encryption to make sure your data and money
                    is always safe." 
                    image={securityIcon} 
                    imagealt="Security Icon"
                />

            </section>
            </main>
            <Footer/>
        </React.Fragment>
    )

}