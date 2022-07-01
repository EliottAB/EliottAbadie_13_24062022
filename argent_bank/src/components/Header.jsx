import "../css/components/header.css"
import 'font-awesome/css/font-awesome.min.css';
import LOGO from "../img/argentBankLogo.png"
import { Link } from "react-router-dom";

export function Header(props){
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
                {props.logout ?
                <div>
                    <Link class="main-nav-item" to="/user">
                        <i class="fa fa-user-circle"></i>
                        Tony
                    </Link>
                    <Link class="main-nav-item" to="/">
                        <i class="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                </div>
                :
                <div>
                    <Link to={"/sign-in"} className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                </div>
                    }
            </nav>
        </header>
    )
}