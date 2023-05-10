import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getCurrentUserPosts } from '../../../store/post'
import PostItem from "../PostItem"
import "./CurrentUserPosts.css"
import { NavLink } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getCommentsForPost } from '../../../store/comment'

const CurrentUserPosts = () => {
    const history= useHistory()
    const dispatch = useDispatch()
    const posts = useSelector(state => state?.posts)
    const postId = posts?.id
    const currentUser = useSelector(state => state?.session?.user)
    const comments = useSelector(state => state?.comments)

    if (!currentUser?.id) {
        history.push("/")
    }

    useEffect(() => {
        dispatch(getCurrentUserPosts())
        dispatch(getCommentsForPost(postId))
    }, [dispatch, Object.values(posts), Object.values(comments)])

    if (!posts) {
        return null
    }



    return (
        <div className='current-user-feed'>
            <div>
                <span className="post-option">
                    <NavLink exact to="/"> Aa</NavLink>
                    <NavLink exact to="/"><i className="fa fa-camera"></i></NavLink>
                    <NavLink exact to="/"><i className="fa fa-quote-left"></i></NavLink>
                    <NavLink exact to="/"><i className="fa fa-chain"></i></NavLink>
                    <NavLink exact to="/"><i className='fas fa-comment-dots'></i></NavLink>
                    <NavLink exact to="/"><i className="fa fa-headphones"></i></NavLink>
                    <NavLink exact to="/"><i className="fa fa-video-camera"></i></NavLink>
                    {/* <span></span> */}
                </span>
                <span className="current-user-nav-links-list">
                    <ul>
                        <li><NavLink exact to="/">{currentUser?.username}</NavLink></li>
                        <li><NavLink exact to="/">Posts</NavLink></li>
                        <li><NavLink exact to="/">Followers</NavLink></li>
                        <li><NavLink exact to="/">Activity</NavLink></li>
                        <li><NavLink exact to="/">Drafts</NavLink></li>
                        <li><NavLink exact to="/">Queue</NavLink></li>
                        <li><NavLink exact to="/">Post+</NavLink></li>
                        <li><NavLink exact to="/">Tumblr Blaze</NavLink></li>
                        <li><NavLink exact to="/">Blog settings</NavLink></li>
                        <li><NavLink exact to="/">Mass Post Editor</NavLink></li>
                    </ul>
                </span>
            </div>
            <ul className='posts'>
                {Object?.values(posts)?.map(post => (
                    <li key={post?.id} className="current-post">
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

export default CurrentUserPosts
