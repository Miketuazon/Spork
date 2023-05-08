import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CreatePost from '../Posts/CreatePost';
// import logo from "../../assets/logo-spork.jpeg"

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	console.log('session-user', sessionUser)
	return (

		<ul className='home-whole-nav-bar'>
			<div className="left-nav-bar">
				<NavLink exact to="/"><div className="spork-logo">S</div></NavLink>
				<div className="search-bar">
					<input type="text" placeholder=" Search Spork" />

				</div>
			</div>
			<div className='right-nav-bar'>
				<li className="home-button-icons">
					{/* <NavLink exact to="/"><div className="spork-logo"></div></NavLink> */}
					<NavLink exact to="/"><i className="fa fa-home"></i></NavLink>
					<NavLink exact to="/"><i className="fa fa-video-camera"></i></NavLink>
					<NavLink exact to="/"><i className="fa fa-compass"></i></NavLink>
					<NavLink exact to="/"><i className='fas fa-store-alt'></i></NavLink>
					<NavLink exact to="/"><i className="fa fa-envelope"></i></NavLink>
					<NavLink exact to="/"><i className='fas fa-comment-dots'></i></NavLink>
					<NavLink exact to="/"><i className="fa fa-bolt"></i></NavLink>
					<NavLink exact to="/"><i className='fas fa-user-alt'></i></NavLink>
					<OpenModalButton
						className='fas fa-pen-square'
					modalComponent={<CreatePost/>}
					/>
					{/* <NavLink exact to="/"><i className='fas fa-pen-square'></i></NavLink> */}

				</li>
			</div>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />

				</li>
			)}
		</ul>
	);
}

export default Navigation;
