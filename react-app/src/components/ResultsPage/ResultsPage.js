import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { thunkGetAllPosts } from '../../store/post'
import PostItem from "../Posts/PostItem"
import { NavLink, useLocation } from "react-router-dom"
import './ResultsPage.css'
import ResultsErrorMessage from './ResultsError'
import ResultsItem from './ResultsItem'
function ResultsPage() {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('query')
    const currentUser = useSelector(state => state?.session?.user)
    const posts = useSelector(state => state?.posts)
    const postsVal = Object?.values(posts)

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
    // Sort posts into asc or desc
    const sortedPosts = Object.values(posts).sort(comparePosts);
    function handleSortClick() {
        if (sortOrder === 'asc') {
            setSortOrder('desc');
        } else {
            setSortOrder('asc');
        }
    }

    // Filter posts if it matches query
    const filteredPosts = sortedPosts.filter(post =>
        (post?.content?.toLowerCase())?.includes(query.toLowerCase()) ||
        (post?.title?.toLowerCase())?.includes(query.toLowerCase()) ||
        (post?.owner?.username?.toLowerCase()?.includes(query.toLowerCase()))
    )

    useEffect(() => {
        dispatch(thunkGetAllPosts())

    }, [dispatch, JSON.stringify(filteredPosts)])
    // If query is empty or filteredPosts is empty
    if (query.length === 0 || filteredPosts.length === 0) return <ResultsErrorMessage />

    return (
        <div className='results-of-search'>
            <div className='sort-container'>
                <div className='sort-and-results'>
                    <h2 className='res'>Results: {filteredPosts.length} | Query: {query}</h2>
                    <h2 className='sortt'>Sort by: &nbsp;
                        <button onClick={handleSortClick} className='sort-button'>
                            {sortOrder === 'asc' ? <i className='fas fa-angle-down'> Older</i> : <i className='fas fa-angle-up'> Newer</i>}
                        </button>
                    </h2>
                </div>
            </div>
            <ul className='posts'>
                {
                    filteredPosts.map(post => (
                        <li key={post?.id} className="post">
                            <ResultsItem post={post} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ResultsPage
