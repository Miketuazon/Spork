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
// import AdDropdown from "./dropdown-adfree";
// import DropdownGifts from "./DropdownGifts";
// import AdDropdown from "./dropdown-adfree";
// import DropdownGifts from "./DropdownGifts";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state?.session?.user);
	const [showProfileButton, setShowProfileButton] = useState(false);
	const posts = useSelector(state => state?.posts)
	const handleProfileButtonClick = () => {
		setShowProfileButton(!showProfileButton);
	};
	useEffect(() => {

	}, [sessionUser])
	return (
		<ul className='home-whole-nav-bar'>
			<div className="left-nav-bar">
				<NavLink exact to="/"><div className="spork-logo">S</div></NavLink>
				<div className="search-bar">
					< SearchBar />
				</div>
				<div className='footer'>
					<ul className='group-link'>
						<li className='name'>
							Brian Washington:
						</li>
						<li className='link'>
							<a href='https://www.linkedin.com/in/brian-washington-668129244/'>LinkedIn</a>
							<a href='https://github.com/zipzopboppitybop' className='end'>Github</a>
						</li>
						<li className='name'>
							Derrick Truong:
						</li>
						<li className='link'>
							<a href='https://www.linkedin.com/in/derrick-truong-1a092121a/'>LinkedIn</a>
							<a href='https://github.com/Derrick-Truong' className='end'>Github</a>
						</li>
						<li className='name'>
							Kisha Onia:
						</li>
						<li className='link'>
							<a href='https://www.linkedin.com/in/kisha-rose-onia-63bb35182/'>LinkedIn</a>
							<a href='https://github.com/kishaonia' className='end'>Github</a>
						</li>
						<li className='name'>
							Michael Tuazon:
						</li>
						<li className='link'>
							<a href='https://www.linkedin.com/in/miketuazon/'>LinkedIn</a>
							<a href='https://github.com/Miketuazon' className='end'>Github</a>
						</li>
					</ul>
				</div>
			</div>
			{sessionUser && isLoaded ? (
				<div className='right-nav-bar'>
					<li className="home-button-icons">
						<NavLink exact to="/"><i className="fa fa-home"></i></NavLink>
						{/* <OpenModalButton ><i className="fa fa-video-camera"></i></OpenModalButton>
						<NavLink exact to="/explore"><i className="fa fa-compass"></i></NavLink>
						<OpenModalButton exact to="/NavMarket"><i className='fas fa-store-alt'></i></OpenModalButton>
						 <button className="nav-bar-non-function-button" onClick={() => alert('Coming soon!')}><i className="fa fa-envelope"></i></button>
						<button className="nav-bar-non-function-button" onClick={() => alert('Coming soon!')}><i className='fas fa-comment-dots'></i></button>
						<button className="nav-bar-non-function-button" onClick={() => alert('Coming soon!')}><i className="fa fa-bolt"></i></button> */}
						{/* <ProfileButton user={sessionUser} /> */}
						<button className="nav-bar-non-function-button"><OpenModalButton className="span-create-post" buttonText={<><i className="fa fa-pen-square"></i></>} modalComponent={<CreatePost />}></OpenModalButton></button><span className="span-profile-button"><ProfileButton user={sessionUser} /></span>

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
