import React from 'react';
// import "./FollowingDropdown.css"
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
  const follower = currentUserVal?.following?.filter(id => id === postsVal?.userId)
  // const postsFilter = currentUserVal?.filter(currentUser?.following?.id === postsVal?.userId)
  console.log('postsfilter', follower)
  const currentlyFollowing = currentUser.following
  console.log("currentlyFollowing", currentlyFollowing)
  // const [search, setSearch] = useState("")
  // const [loaded, setLoaded] = useState(false)
  console.log('postsval => ', postsVal)
  const users = []
  postsVal.forEach(post => {
    users.push(post.owner)
  })
  console.log("users =>", users)
  const uniqueUsers = users.filter((user, index, array) =>
    array.findIndex(u => u.id === user.id) === index
  )
  console.log("uniqueUsers =>", uniqueUsers)
  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])
  return (
    <>
      <div className='user-search-results'>
        <div className='user'>
          Hello
          {
            uniqueUsers.forEach(user => {
              console.log(user)
              console.log("currentUser", currentUser)
              console.log("currentlyFollowing", currentlyFollowing)
              user.id != currentUser.id ?
                <>{user.username}</>
                : <></>
              // debugger
              // user.id != currentUser.id && currentlyFollowing.includes(user.id) ?
              // <div>
              //   <h1>{user.email}</h1>
              //   <h2>{user.username}</h2>
              // </div>
              // : <></>
            })
          }
        </div>
      </div>
    </>
    // </div>
  );
};

export default FollowingDropdown;
