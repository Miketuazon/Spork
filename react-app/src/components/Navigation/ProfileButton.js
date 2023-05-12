import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreatePost from "../Posts/CreatePost";
import './ProfileButton.css'


function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown-login" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const handlePopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };


  return (
    <>
      <button className="button-green-login" onClick={openMenu}>
        {user ? (
          <>
            <i className="fas fa-user-alt" />
            <span className="profile-button-text"></span>
          </>
        ) : (
          <span className="profile-button-text">Log in</span>
        )}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="options-for-drop-down">
              <ul>
                <div className="top-dropdown-menu-options">
                  <li>
                    <button className="account-menu-dropdown">Account </button>
                  </li>
                  <li><button onClick={handleLogout}> Log Out</button></li></div>
                <li> <button onClick={() => window.location.href = '/Likes'}> <i className="fas fa-heart"></i> Likes</button></li>
                <li><i className="fas fa-user-friends"></i>
                  <button className="following-btn" onClick={() => window.location.href = "/Following"}>Following  {user?.following?.length > 0 ? Number(user?.following?.length) : <></>}</button></li>
                <li><button className="popup-btn" onClick={() => alert('Settings feature coming soon, sorry!')}><i className="fas fa-cog"></i> Settings</button></li>
                <li><button onClick={() => window.location.href = '/adfree'}><i className="fas fa-ad"></i> Ad-Free</button></li>
                <li onClick={() => window.location.href = "/paymentandpurchases"}><i className="fas fa-credit-card"></i> Payment and Purchases</li>
                <li onClick={() => window.location.href = '/gifts'}><i className="fas fa-gift"></i> Gifts</li>
                <li onClick={() => window.location.href = '/livestreamcredits'}><i className='fas fa-coins'></i> Live Streaming Credits</li>
                <li><button className="popup-btn" onClick={() => alert('Whats New feature coming soon, sorry! ')}><i className="fas fa-bullhorn"></i> What's New</button></li>
                <li><button className="popup-btn" onClick={() => alert('Help feature coming soon, sorry!')}><i className="fas fa-question-circle"></i> Help</button></li><li>
                  <button className="popup-btn" onClick={() => alert('Keybord Shortcuts feature coming soon, sorry!')}>
                    <i className="fas fa-keyboard"></i> Keyboard Shortcuts</button></li> <li><button className="popup-btn" onClick={() => alert('Change Palette feature coming soon, sorry!')}>
                      <i className="fas fa-palette"></i> Change Palette </button></li>
                <div className="top-dropdown-menu-options"><li><button className="account-menu-dropdown">Blogs </button></li>
                  <li><OpenModalButton buttonText="New+" modalComponent={<CreatePost />}></OpenModalButton></li></div>
                <div className="bottom-dropdown-menu-small">
                  {/* <li><NavLink exact to="/posts/current_user"><i className="fas fa-file"></i>{user.username}'s Posts</NavLink></li> */}
                  <li onClick={() => { window.location.href = '/posts/current' }}><i className="fas fa-file"></i>{user.username}'s Posts</li>
                  <li><i className="fas fa-users"></i> Followers {user?.followers?.length > 0 ? Number(user?.followers?.length) : <></>}</li>
                  <li><i className="fas fa-chart-line"></i> Activity</li>
                  <li><i className="fas fa-file-alt"></i> Drafts</li>
                  <li><i className="fas fa-stream"></i> Queue</li>
                  <li><i className="fas fa-fire"></i> Posts+ Spork Blaze</li>
                  <li><i className="fas fa-cog"></i> Blog Settings</li>
                </div>
              </ul>
            </div>

          </>
        ) : (
          <>
            <li><OpenModalButton modalType={LoginFormModal}>Log in</OpenModalButton></li>
            <li><OpenModalButton modalType={SignupFormModal}>Sign up</OpenModalButton></li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
