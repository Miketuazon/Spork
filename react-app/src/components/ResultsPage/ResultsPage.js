import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { thunkGetAllPosts } from '../../store/post'
import PostItem from "../Posts/PostItem"
import { NavLink, useLocation } from "react-router-dom"
import './ResultsPage.css'
import '../Posts/Feed/Feed.css'
import LoadingScreen from '../LoadingScreen'

function ResultsPage() {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('query')
    const currentUser = useSelector(state => state?.session?.user)
    const posts = useSelector(state => state?.posts.allPosts)

    console.log(posts)

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    return (
        <div className='Feed'>
            {posts ? (
                <ul className='posts'>
                    {Object.values(posts).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))?.map(post => (
                        <li key={post.id} className="post">
                            <PostItem post={post} />
                        </li>
                ))}
                </ul>
            ) : (
                <LoadingScreen />
            )}
        </div>
    )
}

export default ResultsPage
