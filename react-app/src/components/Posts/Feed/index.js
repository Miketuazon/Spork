import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { thunkGetAllPosts } from '../../../store/post'
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
  const posts = useSelector(state => state?.posts.posts)
  const currentUser = useSelector(state => state?.session?.user)
  const currentUserLikes = currentUser?.likes
  const postsVal = Object?.values(posts)
  const postsLikes = postsVal?.likes
  const postsComments = posts?.comments
  const comments = useSelector(state => state?.comments)
  const commentId = comments?.id


  useEffect(() => {
    dispatch(thunkGetAllPosts())
    // dispatch(getCommentsForPost(postId))
    // dispatch(getCommentsForPost(postId))
  }, [dispatch, JSON.stringify(postsVal), JSON.stringify(currentUserLikes)])

  return (
    <div className='Feed'>
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
