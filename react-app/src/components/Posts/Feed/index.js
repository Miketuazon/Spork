import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../../store/post'
<<<<<<< HEAD
import { Link } from 'react-router-dom'
import PostItem from '../PostItem'
=======
import PostItem from "../PostItem"
import "./Feed.css"
import { NavLink } from "react-router-dom"
>>>>>>> dev

const Feed = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(getAllPosts())
<<<<<<< HEAD
    }, [])
=======
    }, [dispatch])
>>>>>>> dev

    return (
        <div className='Feed'>
            <div className="post-option">
                <NavLink exact to="/"> Aa</NavLink>
                <NavLink exact to="/"><i className="fa fa-camera"></i></NavLink>
                <NavLink exact to="/"><i className="fa fa-quote-left"></i></NavLink>
                <NavLink exact to="/"><i className="fa fa-chain"></i></NavLink>
                <NavLink exact to="/"><i className='fas fa-comment-dots'></i></NavLink>
                <NavLink exact to="/"><i className="fa fa-headphones"></i></NavLink>
                <NavLink exact to="/"><i className="fa fa-video-camera"></i></NavLink>
                <span></span>
            </div>
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
