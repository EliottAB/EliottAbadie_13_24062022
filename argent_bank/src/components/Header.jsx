import "../css/components/header.css"
import 'font-awesome/css/font-awesome.min.css';
import LOGO from "../img/argentBankLogo.png"

export function Header(){
    return(
        <header>
            <nav className="main-nav">
                <a className="main-nav-logo" href="./index.html">
                    <img
                    className="main-nav-logo-image"
                    src={LOGO}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div>
                    <a className="main-nav-item" href="./sign-in.html">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                    </a>
                </div>
            </nav>
        </header>
    )
}