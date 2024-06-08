import React from 'react';
import { useSelector } from 'react-redux';
import "./SettingsPage.css";

const SettingsPage = () => {
    const sessionUser = useSelector(state => state.session.user);

  return (
    <div id='settings-page'>
        <div id='user-appearence'>
            <p id='username'>{sessionUser.username}</p>
            <button id='change-appearence-button'>Edit Appearance</button>
        </div>
        
    </div>
  )
}

export default SettingsPage
