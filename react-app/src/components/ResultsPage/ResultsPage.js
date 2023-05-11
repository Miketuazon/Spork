import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../store/post'
import PostItem from "../Posts/PostItem"
// import "./Feed.css"
import { NavLink, useLocation } from "react-router-dom"

function ResultsPage() {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('query')
    const currentUser = useSelector(state => state?.session?.user)
    console.log("query => ", query)
    console.log('Current User', currentUser)
    const posts = useSelector(state => state?.posts)
    const postsVal = Object?.values(posts)
    console.log('Posts', posts)
    useEffect(() => {
        dispatch(getAllPosts())

    }, [dispatch, JSON.stringify(postsVal)])
    return (
        <div className='results-of-search'>
            <ul className='posts'>
                {
                    Object?.values(posts)?.map(post => (
                        post.content.includes(query)
                            ?
                            <li key={post?.id} className="post">
                                <PostItem post={post} />
                            </li>
                            :
                            null
                    ))
                }
            </ul>
        </div>
    )
}

export default ResultsPage
