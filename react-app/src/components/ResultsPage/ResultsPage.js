import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../store/post'
import PostItem from "../Posts/PostItem"
import { NavLink, useLocation } from "react-router-dom"
import './ResultsPage.css'

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
    function comparePosts(post1, post2) {
        const timestamp1 = new Date(post1.createdAt).getTime();
        const timestamp2 = new Date(post2.createdAt).getTime();
        if (sortOrder === 'asc') {
            return timestamp1 - timestamp2;
        } else {
            return timestamp2 - timestamp1;
        }
    }

    const sortedPosts = Object.values(posts).sort(comparePosts);

    function handleSortClick() {
        if (sortOrder === 'asc') {
            setSortOrder('desc');
        } else {
            setSortOrder('asc');
        }
    }
    console.log("sortedPosts", sortedPosts)
    useEffect(() => {
        dispatch(getAllPosts())

    }, [dispatch, JSON.stringify(postsVal)])
    return (
        <div className='results-of-search'>
            <div className='sort-container'>
                <h2 className='sortt'>Sort by:</h2>
                <button onClick={handleSortClick} className='sort-button'>
                    {sortOrder === 'asc' ? 'Older Posts' : 'Most Recent Posts'}
                </button>
            </div>
            <ul className='posts'>
                {
                    sortedPosts?.map(post => (
                        (post?.content?.toLowerCase())?.includes(query) || (post?.title?.toLowerCase())?.includes(query) || (post?.owner?.username?.toLowerCase()?.includes(query))
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
