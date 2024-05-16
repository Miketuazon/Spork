import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./SideMenu.css"
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreatePost from "../Posts/CreatePost";
import LoginButton from "../Navigation/LoginButton";
import LoginFormModal from "../LoginFormModal";

const SideMenu = () => {
    const sessionUser = useSelector(state => state?.session?.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [showAccount, setShowAccount] = useState(false)
    const [showAccountValue, setShowValue] = useState("Show Account")

    // code for arrow up/down depending on click
    const handleAccountClick = () => {
        if (showAccountValue === "Show Account") {
            setShowValue("Hide Account")
            setShowAccount(true)
        }
        else {
            setShowValue("Show Account")
            setShowAccount(false)
        }
    }

    // log out
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/')
    };

    // Code to hide and show account dropdown
    const showAccountDiv = "account-container" + (showAccount ? "" : " hidden")

    useEffect(() => {

    }, [sessionUser])

    return (
        <>
            {sessionUser ? (
                <div className="sideMenu">
                    <ul className="categoriesSideMenu">
                        <div className="sporkLogoSide"></div>
                        <div className="HomeButton">
                        <NavLink exact to="/"><h1 className="sporkLogoSideMenu">Spork</h1></NavLink>
                        </div>
                        <li className="homeDropdown" onClick={() => window.location.href = '/'}>
                            <div className="sideIcon">
                                <i className="fa fa-home" aria-hidden="true"></i>
                            </div>
                            <div className="sideTitle">Home</div>
                        </li>
                        <li className="accountDropdown">
                            <div className="sideIcon">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </div>
                            <div className="account" onClick={handleAccountClick}>
                                Account
                                <div><i className="fa fa-caret-down" aria-hidden="true"></i></div>
                            </div>
                        </li>
                        <div className={showAccountDiv}>
                            <div className="likes-account" onClick={() => window.location.href = '/Likes'}>Likes</div>
                            <div className="following-account" onClick={() => window.location.href = "/following"}>Following</div>
                            <div className="logOutButton-account" onClick={handleLogout}>Log Out</div>
                        </div>
                    </ul>
                    <div className="createPostButtonContainer">
                        <OpenModalButton className="createPostButton" buttonText={<button className="createPostButton">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            Create
                        </button>} modalComponent={<CreatePost />}>
                        </OpenModalButton>
                    </div>
                </div>

            ) : (
                <div className="sideMenu">
                    <ul className="categoriesSideMenu">
                        <div className="sporkLogoSide"></div>
                        <div className="HomeButton">
                            <h1 className="sporkLogoSideMenu">Spork</h1>
                        </div>
                        <div className="login-sidemenu">
                            <LoginButton
                                className="button-green-login"
                                buttonText="Log In"
                                modalComponent={<LoginFormModal />}
                            />
                        </div>
                    </ul>
                </div>
            )}
        </>
    )
}

export default SideMenu
