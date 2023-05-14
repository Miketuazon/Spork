import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../store/post'
import PostItem from "../Posts/PostItem"
import { NavLink, useLocation } from "react-router-dom"
import './ResultsPage.css'
import LoaderIcon from './LoaderIcon.js'

function ResultsPage() {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('query')
    const currentUser = useSelector(state => state?.session?.user)
    // console.log("query => ", query)
    // console.log('Current User', currentUser)
    const posts = useSelector(state => state?.posts)
    const postsVal = Object?.values(posts)
    // console.log('Posts', posts)

    // Creating state and function for sorting posts
    const [sortOrder, setSortOrder] = useState('desc');

    function comparePosts(post1, post2) {
        const timeA = new Date(post1.createdAt).getTime();
        const timeB = new Date(post2.createdAt).getTime();
        if (sortOrder === 'asc') {
            return timeA - timeB;
        } else {
            return timeB - timeA;
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

    // Results page
    let resultsList = sortedPosts?.map(post => (
        (post?.content?.toLowerCase())?.includes(query)
            || (post?.title?.toLowerCase())?.includes(query)
            || (post?.owner?.username?.toLowerCase())?.includes(query)
            ?
            <li key={post?.id} className="post">
                <PostItem post={post} />
            </li>
            :
            null
    ))
    // console.log("resultsList", resultsList)

    // Show error if every result is null
    let showError = Object.values(resultsList).every(obj => {
        if (obj === null) return true;
        return false;
    })
    // console.log("showError", showError)

    // No results
    let noResults = <div className='no-results'>
        <h1>Sorry, there are no results for {query}.</h1>
        <h2>Please search for:</h2>
        <h3>Posts, users or even part of word in a post! :D</h3>
    </div>

    useEffect(() => {
        dispatch(getAllPosts())

    }, [dispatch, JSON.stringify(postsVal), JSON.stringify(currentUser)])

    if (postsVal.length === 0) return <LoaderIcon />
    return (
        <div className='results-of-search'>
            <div className='sort-container'>
                <span className='sortt'>Sort by:</span>
                <button onClick={handleSortClick} className='sort-button'>
                    {sortOrder === 'asc' ? 'Older' : 'Most Recent Posts'}
                </button>
            </div>
            <ul className='posts'>
                {query != ""
                    ?
                    showError === true ? <>{noResults}</> : <>{resultsList}</>
                    :
                    <>{noResults}</>
                }
            </ul>
        </div>
    )
}

export default ResultsPage
