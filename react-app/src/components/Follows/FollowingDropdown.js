import React from 'react';
import "./FollowingDropdown.css"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/users';
import { getAllPosts } from '../../store/post';
import { useEffect } from 'react';


const FollowingDropdown = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state?.posts)
  console.log('posts', posts)
  const postsVal = Object.values(posts)
  const currentUser = useSelector(state => state?.session?.user)
  console.log('currentuser', currentUser)
  const currentUserVal = Object.values(currentUser)
  const follower = currentUserVal?.following?.filter( id=> id === postsVal?.userId)
  // const postsFilter = currentUserVal?.filter(currentUser?.following?.id === postsVal?.userId)
console.log('postsfilter', follower)


useEffect(() => {
dispatch(getAllPosts())
}, [dispatch])
  return (
    <div className="lSyOz">
      <main className="rmkqO">
        <h1 className="IiZ2z">Following {currentUser?.following?.length > 0 ? Number(currentUser?.following?.length) : <></>}</h1>

        <form className="Il4T7" action="">
          <input className="dyc2r" type="text" autoComplete="off" placeholder="Enter a username or URL to follow" value="" />
          <button className="TRX6J BfS8g" aria-label="Follow" disabled="">
            <span className="EvhBA Tb7Ey" tabIndex="-1"><i class='fas fa-user-plus'>Follow</i></span>
          </button>
        </form>:<></>

        <section className="NedHV"></section>
      </main>
    </div>
  );
};

export default FollowingDropdown;
