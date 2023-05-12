import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../store/post'
import PostItem from "../Posts/PostItem"
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

    // Creating state and function for sorting posts
    const [sortOrder, setSortOrder] = useState('desc');
    const sortedPosts = Object.values(posts).sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.createdAt.localeCompare(b.createdAt);
        } else {
            return b.createdAt.localeCompare(a.createdAt);
        }
    });

    function handleSortClick() {
        if (sortOrder === 'asc') {
            setSortOrder('desc');
        } else {
            setSortOrder('asc');
        }
    }

    useEffect(() => {
        dispatch(getAllPosts())

    }, [dispatch, JSON.stringify(postsVal)])
    return (
        <div className='results-of-search'>
            <div className='sort-container'>
                <h2>Sort by:</h2>
                <button onClick={handleSortClick}>
                    {sortOrder === 'asc' ? 'Older' : 'Most Recent Posts'}
                </button>
            </div>
            <ul className='posts'>
                {query !== "" ?
                    sortedPosts?.map(post => (
                        (post?.content?.toLowerCase())?.includes(query) || (post?.title?.toLowerCase())?.includes(query) || post?.owner?.username?.toLowerCase()?.includes(query)
                            ?
                            <li key={post?.id} className="post">
                                <PostItem post={post} />
                            </li>
                            :
                            null
                    ))
                    :
                    <div className='empty-message'>
                        <h1>Your query was empty :/ </h1>
                        <h2>Please enter at least one character to search posts!</h2>
                    </div>
                }
            </ul>
        </div>
    )
}

export default ResultsPage
