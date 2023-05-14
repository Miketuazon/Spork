import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getCurrentUserPosts } from '../../../store/post'
import PostItem from "../PostItem"
import "./CurrentUserPosts.css"

const CurrentUserPosts = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state?.posts)
  const currentUser = useSelector(state => state?.session?.user)
  const currentUserLikes = currentUser?.likes
  const postsVal = Object?.values(posts)



  useEffect(() => {
    dispatch(getCurrentUserPosts())
  }, [dispatch, JSON.stringify(postsVal), JSON.stringify(currentUser), JSON.stringify(currentUserLikes)])

  if (!posts) {
    return null
  }



  return (
    <div className='current-user-feed'>
      <div>
        <ul className="post-types">
          <li>
            <button className="post-type-btn text-btn" aria-label="Text">
              <span className="post-type-icon">
                <i className="fas fa-font"></i>
              </span>
              Text
            </button>
          </li>
          <li>
            <button className="post-type-btn photo-btn" aria-label="Photo">
              <span className="post-type-icon">
                <i className="fas fa-camera"></i>
              </span>
              Photo
            </button>
          </li>
          <li>
            <button className="post-type-btn quote-btn" aria-label="Quote">
              <span className="post-type-icon">
                <i className="fas fa-quote-left"></i>
              </span>
              Quote
            </button>
          </li>
          <li>
            <button className="post-type-btn link-btn" aria-label="Link">
              <span className="post-type-icon">
                <i className="fas fa-link"></i>
              </span>
              Link
            </button>
          </li>
          <li>
            <button className="post-type-btn chat-btn" aria-label="Chat">
              <span className="post-type-icon">
                <i className="fas fa-comment-alt"></i>
              </span>
              Chat
            </button>
          </li>
          <li>
            <button className="post-type-btn audio-btn" aria-label="Audio">
              <span className="post-type-icon">
                <i className="fas fa-volume-up"></i>
              </span>
              Audio
            </button>
          </li>
          <li>
            <button className="post-type-btn video-btn" aria-label="Video">
              <span className="post-type-icon">
                <i className="fas fa-video"></i>
              </span>
              Video
            </button>
          </li>
        </ul>
      </div>
      <ul className='posts'>
        {Object?.values(posts) < 1 ? <h1 className='no-posts'>You have no posts!</h1> : Object?.values(posts)?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map(currentPost => (
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
