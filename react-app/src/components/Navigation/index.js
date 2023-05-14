import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useEffect } from 'react';
import LoginFormModal from '../LoginFormModal';
import CreatePost from '../Posts/CreatePost';
import SearchBar from '../ResultsPage/Searchbar';
// import logo from "../../assets/logo-spork.jpeg"

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state?.session?.user);
	const [showProfileButton, setShowProfileButton] = useState(false);
	const posts = useSelector(state => state?.posts)
	const handleProfileButtonClick = () => {
		setShowProfileButton(!showProfileButton);
	};
	console.log('session-user', sessionUser)
useEffect(()=> {

},[sessionUser])
	return (

		<ul className='home-whole-nav-bar'>
			<div className="left-nav-bar">
				<NavLink exact to="/"><div className="spork-logo">S</div></NavLink>
				<div className="search-bar">
					< SearchBar />
				</div>
			</div>
			{sessionUser && isLoaded ? (
				<div className='right-nav-bar'>
					<li className="home-button-icons">
						<NavLink exact to="/"><i className="fa fa-home"></i></NavLink>
						<NavLink exact to="/live"><i className="fa fa-video-camera"></i></NavLink>
						<NavLink exact to="/explore"><i className="fa fa-compass"></i></NavLink>
						<NavLink exact to="/NavMarket"><i className='fas fa-store-alt'></i></NavLink>
						<button className="nav-bar-non-function-button" onClick={() => alert('Coming soon!')}><i className="fa fa-envelope"></i></button>
						<button className="nav-bar-non-function-button"  onClick={() => alert('Coming soon!')}><i className='fas fa-comment-dots'></i></button>
						<button className="nav-bar-non-function-button" onClick={() => alert('Coming soon!')}><i className="fa fa-bolt"></i></button>
						{/* <ProfileButton user={sessionUser} /> */}
						<button className="nav-bar-non-function-button"><OpenModalButton className="span-create-post" buttonText={<><i className="fa fa-pen-square"></i></>} modalComponent={<CreatePost />}></OpenModalButton></button><span className="span-profile-button"><ProfileButton user={sessionUser} /></span>
						{/* <span className="span-profile-button"><ProfileButton user={sessionUser}/></span> */}

					</li>
				</div>)
				: (
					<div className="log-in-nav-bar">
						<OpenModalButton
							clasName="button-green-login"
							buttonText="Log In"
							modalComponent={<LoginFormModal />}
						/>
					</div>
				)

			}

		</ul>
	);
}

export default Navigation;
