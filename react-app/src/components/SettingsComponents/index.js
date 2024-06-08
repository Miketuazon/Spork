import React from 'react';
import { useSelector } from 'react-redux';
import "./SettingsPage.css";

const SettingsPage = () => {
    const sessionUser = useSelector(state => state.session.user);

  return (
    <div id='settings-page'>

        <div>
            <p id='username'>{sessionUser.username}</p>
            <button id='change-appearence-button'>Edit Appearance</button>
        </div>

        <img id='profile-banner' src={sessionUser.profile_banner} alt='Hello' />

        <div id='profile-picture-container'>
            <img id='profile-picture' src={sessionUser.profile_image} alt='Hello' />
        </div>
    </div>
  )
}

export default SettingsPage
