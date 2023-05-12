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


const Feed = () => {
    const followers = useSelector(state => state?.follow)

    const dispatch = useDispatch()
    const posts = useSelector(state => state?.posts)
    const currentUser = useSelector(state => state?.session?.user)
    const postsVal = Object?.values(posts)
    const comments = useSelector(state => state?.comments)
    const commentId = comments?.id
    const commentsVal = Object?.values(comments)

    useEffect(() => {
        dispatch(getAllPosts())
        // dispatch(getCommentsForPost(postId))
        // dispatch(getCommentsForPost(postId))
    }, [dispatch, JSON.stringify(posts), JSON.stringify(posts.comments)])

    return (
        <div className='Feed'>
          { currentUser ?
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

</ul>:<></>
}
{currentUser ?
<div className='following-foryou-tags-manage'>
<a href="/following">Following</a>
    <a href="/">For you</a>
    <a href="/">Your tags</a>
    <a href="/">Manage...</a>

</div>:<></>
}
<div className='spork-live-thumbnails'>
        <h4>Spork Live</h4>
        <div className='spork-live-thumbnails-imgs'>
                <img className='taylor' src={logo1}  alt="logo1"/>
                <img className='taylor2' src={logo2} alt="logo2"/>
                <img className='britney1' src={logo3} alt="logo3" />
                <div class="live-outer-box"><a href="/live"></a>

                    <div class="live-box-more"><a href="/live">See more +</a></div>

                </div>

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
