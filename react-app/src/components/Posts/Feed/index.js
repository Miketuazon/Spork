import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../../store/post'
import PostItem from "../PostItem"
import "./Feed.css"
import { NavLink } from "react-router-dom"


const Feed = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state?.posts)
    const currentUser = useSelector(state => state?.session?.user)
    console.log('Posts', posts)
    console.log('Current User', currentUser)
    useEffect(() => {
        dispatch(getAllPosts())

    }, [dispatch, posts.comments, JSON.stringify(posts), JSON.stringify(Object?.values(posts))])

    return (
        <div className='Feed'>
            <div className="post-option">
                <NavLink className="AA-Text" exact to="/"> Aa</NavLink>
                <NavLink exact to="/"><i className="fa fa-camera"></i></NavLink>
                <NavLink exact to="/"><i className="fa fa-quote-left"></i></NavLink>
                <NavLink exact to="/"><i className="fa fa-chain"></i></NavLink>
                <NavLink exact to="/"><i className='fas fa-comment-dots'></i></NavLink>
                <NavLink exact to="/"><i className="fa fa-headphones"></i></NavLink>
                <NavLink exact to="/"><i className="fa fa-video-camera"></i></NavLink>
                <span></span>
            </div>
            <ul className='posts'>
                {Object?.values(posts)?.map(post => (
                    <li key={post?.id} className="post">
                        <PostItem post={post} />
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

export default Feed
