import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
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
  };

  const ulClassName = "profile-dropdown-login" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

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
              <li><i className="fas fa-heart"></i> Likes</li>
              <li><i className="fas fa-user-friends"></i> Following</li>
              <li><i className="fas fa-cog"></i> Settings</li>
              <li><i className="fas fa-ad"></i> Ad-Free</li>
              <li><i className="fas fa-credit-card"></i> Payment and Purchases</li>
              <li><i className="fas fa-gift"></i> Gifts</li>
              <li><i className="fas fa-video"></i> Live Streaming Credits</li>
              <li><i className="fas fa-bullhorn"></i> What's New</li>
              <li><i className="fas fa-question-circle"></i> Help</li>
              <li><i className="fas fa-keyboard"></i> Keyboard Shortcuts</li>
              <li><i className="fas fa-palette"></i> Change Palette</li>
              <li><i className="fas fa-file"></i> {user.username}'s Posts</li>
              <li><i className="fas fa-users"></i> Followers</li>
              <li><i className="fas fa-chart-line"></i> Activity</li>
              <li><i className="fas fa-file-alt"></i> Drafts</li>
              <li><i className="fas fa-stream"></i> Queue</li>
              <li><i className="fas fa-fire"></i> Posts+ Tumblr Blaze</li>
              <li><i className="fas fa-cog"></i> Blog Settings</li>
              <li>

                <button onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Log Out</button>
              </li>
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
