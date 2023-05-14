import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../../store/post'
import PostItem from "../PostItem"
import "./Feed.css"
import { NavLink } from "react-router-dom"
import { getCommentsForPost } from '../../../store/comment'
import logo1 from '../../../assets/live-data-1.jpg'
import logo2 from '../../../assets/live-data-2.jpg'
import logo3 from '../../../assets/live-data-3.jpg'
import { getFollowsForUser } from '../../../store/follow'
import videoFile from '../../../assets/taylor-vid-2.MOV';
import OpenModalButton from '../../OpenModalButton'
import CreatePost from '../CreatePost'



const Feed = () => {
  const followers = useSelector(state => state?.follow)

  const dispatch = useDispatch()
  const posts = useSelector(state => state?.posts)
  const currentUser = useSelector(state => state?.session?.user)
  const currentUserLikes = currentUser?.likes
  const postsVal = Object?.values(posts)
  const postsLikes = postsVal?.likes
  const postsComments = posts?.comments
  const comments = useSelector(state => state?.comments)
  const commentId = comments?.id


  useEffect(() => {
    dispatch(getAllPosts())
    // dispatch(getCommentsForPost(postId))
    // dispatch(getCommentsForPost(postId))
  }, [dispatch, JSON.stringify(postsVal), JSON.stringify(currentUserLikes)])

  return (
    <div className='Feed'>
      {currentUser ?
        <ul class="post-types">
          <div className='create-footer'>Text
            <OpenModalButton className="Create Post" buttonText={<> <i className="fas fa-font"></i></>} modalComponent={<CreatePost />}></OpenModalButton></div>
          <div className='photo-footer'>Photo<a class="fas fa-camera" onClick={() => alert("Coming soon!")}></a></div>
          <div className='quote-footer'>Quote
            <a class="fas fa-quote-right" onClick={() => alert("Coming soon!")}></a></div>
          <div className='link-footer'>Link<a class="fas fa-link" onClick={() => alert("Coming soon!")}></a></div>
          <div className='chat-footer'>Chat<a class="fas fa-comment-alt" onClick={() => alert("Coming soon!")}></a></div>
          <div className='sound-footer'>Sound<a class="fas fa-volume-up" onClick={() => alert("Coming soon!")}></a></div>
          <div className='video-footer'>Video<a class="fas fa-video" onClick={() => alert("Coming soon!")}></a></div>





        </ul> : <></>
      }
      {currentUser ?
        <div className='following-foryou-tags-manage'>
          <a href="/following">Following</a>
          <a href="/explore">For you</a>
          <a onClick={() => alert('This feature is coming soon!')}>Your tags</a>
          <a onClick={() => alert("Coming soon!")}>Manage...</a>

        </div> : <></>
      }
      <div className='spork-live-thumbnails'>
        <h4>Spork Live</h4>
        <div className='spork-live-thumbnails-imgs'>
          <img className='taylor' href="/live" src={logo1} alt="logo1" />
          <img className='taylor2' src={logo2} alt="logo2" />
          <img className='britney1' src={logo3} alt="logo3" />
          <a href="/live">
            <div class="live-box-more"><a className='live-text' href="/live">See more +</a></div>
            <div class="live-outer-box"> </div>


          </a>




        </div>

      </div>

      <ul className='posts'>
        {Object?.values(posts)?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map(post =>

        // post?.createdAt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })?.format(post?.createdAt)
        // const postDate = new Date(post?.createdAt)
        // const formattedDate = postDate ? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })?.format(postDate) : '';
        // const follower = Object.values(post?.owner?.followers).find(id => id === currentUser?.id)

        (

          <li key={post?.id} className="post">
            <PostItem post={post} />
          </li>
        )

        )
        }
      </ul>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>

  )
}

export default Feed
