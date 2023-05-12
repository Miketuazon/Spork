import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getCurrentUserPosts } from '../../../store/post'
import PostItem from "../PostItem"
import "./CurrentUserPosts.css"
import { NavLink } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getCommentsForPost } from '../../../store/comment'
import Navigation from '../../Navigation'

const CurrentUserPosts = () => {
    const history= useHistory()
    const dispatch = useDispatch()
    const posts = useSelector(state => state?.posts)
    const postsVal = Object?.values(posts)
    const currentUser = useSelector(state => state?.session?.user)
    // const comments = useSelector(state => state?.comments)

    if (!currentUser) {
        history.push("/")
    }

    useEffect(() => {
        dispatch(getCurrentUserPosts())
        // dispatch(getCommentsForPost(postId))
    }, [dispatch, JSON.stringify(postsVal)])

    if (!posts) {
        return null
    }



    return (
        <div className='current-user-feed'>
            <div>
            <ul class="post-types">
  <li>
    <button class="post-type-btn text-btn" aria-label="Text">
      <span class="post-type-icon">
        <i class="fas fa-font"></i>
      </span>
      Text
    </button>
  </li>
  <li>
    <button class="post-type-btn photo-btn" aria-label="Photo">
      <span class="post-type-icon">
        <i class="fas fa-camera"></i>
      </span>
      Photo
    </button>
  </li>
  <li>
    <button class="post-type-btn quote-btn" aria-label="Quote">
      <span class="post-type-icon">
        <i class="fas fa-quote-left"></i>
      </span>
      Quote
    </button>
  </li>
  <li>
    <button class="post-type-btn link-btn" aria-label="Link">
      <span class="post-type-icon">
        <i class="fas fa-link"></i>
      </span>
      Link
    </button>
  </li>
  <li>
    <button class="post-type-btn chat-btn" aria-label="Chat">
      <span class="post-type-icon">
        <i class="fas fa-comment-alt"></i>
      </span>
      Chat
    </button>
  </li>
  <li>
    <button class="post-type-btn audio-btn" aria-label="Audio">
      <span class="post-type-icon">
        <i class="fas fa-volume-up"></i>
      </span>
      Audio
    </button>
  </li>
  <li>
    <button class="post-type-btn video-btn" aria-label="Video">
      <span class="post-type-icon">
        <i class="fas fa-video"></i>
      </span>
      Video
    </button>
  </li>
</ul>

                <span className="current-user-nav-links-list">
                    <ul>
                        <li><NavLink exact to="/">{currentUser?.username}</NavLink></li>
                        <li><NavLink exact to="/">Posts</NavLink></li>
                        <li><NavLink exact to="/">Followers</NavLink></li>
                        <li><NavLink exact to="/">Activity</NavLink></li>
                        <li><NavLink exact to="/">Drafts</NavLink></li>
                        <li><NavLink exact to="/">Queue</NavLink></li>
                        <li><NavLink exact to="/">Post+</NavLink></li>
                        <li><NavLink exact to="/">Spork Blaze</NavLink></li>
                        <li><NavLink exact to="/">Blog settings</NavLink></li>
                        <li><NavLink exact to="/">Mass Post Editor</NavLink></li>
                    </ul>
                </span>
            </div>
            <ul className='posts'>
                {Object?.values(posts)?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map(currentPost => (
                    <li key={currentPost?.id} className="current-post">
                        <PostItem post={currentPost} />
                    </li>
                ))}
            </ul>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default CurrentUserPosts
