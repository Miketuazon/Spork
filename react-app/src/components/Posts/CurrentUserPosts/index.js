import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getCurrentUserPosts } from '../../../store/post'
import PostItem from "../PostItem"
import "./CurrentUserPosts.css"
import { NavLink } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import Navigation from '../../Navigation'

const CurrentUserPosts = () => {
  const history = useHistory()

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
    dispatch(getCurrentUserPosts())
    // dispatch(getCommentsForPost(postId))
    // dispatch(getCommentsForPost(postId))
  }, [dispatch, JSON.stringify(postsVal), JSON.stringify(currentUser), JSON.stringify(currentUserLikes)])

  if (!posts) {
    return null
  }



  return (
    <div className='current-user-feed'>
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
