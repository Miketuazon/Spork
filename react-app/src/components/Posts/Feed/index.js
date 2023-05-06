import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../../store/post'
import { Link } from 'react-router-dom'
import PostItem from '../PostItem'

const Feed = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    return (
        <div className='Feed'>
            <ul className='posts'>
                {Object.values(posts).map(post => (
                    <li key={post.id} className="post">
                        <PostItem post={post} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Feed
