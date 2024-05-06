import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { thunkGetAllPosts } from '../../../store/post'
import PostItem from "../PostItem"
import "./Feed.css"

const Feed = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state?.posts.allPosts)

  useEffect(() => {
    dispatch(thunkGetAllPosts())
  }, [dispatch])

  return (
    <div className='Feed'>
      <ul className='posts'>
        {posts ? (
          <>
            {Object.values(posts)?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map(post =>
              (
                <li key={post?.id} className="post">
                  <PostItem post={post} />
                </li>
              ))}
          </>
        ) : (
          <div><h1 className="no-posts">No Posts</h1></div>
        )}
      </ul>
    </div>
  )
}

export default Feed
