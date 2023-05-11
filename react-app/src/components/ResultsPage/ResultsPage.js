import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../store/post'
// import PostItem from "../PostItem"
// import "./Feed.css"
import { NavLink, useLocation } from "react-router-dom"

function ResultsPage() {
    const dispatch = useDispatch()
    const location = useLocation()
    console.log('location', location.pathname)
    const currentUser = useSelector(state => state?.session?.user)
    const currentUrl = new URL(window.location.href)
    console.log("url =>", currentUrl)
    const params = new URLSearchParams(currentUrl)
    console.log(params.get("query"))
    // const query = currentUrl.get("query")
    // console.log("query => ", query)
    const posts = useSelector(state => state?.posts)
    const postsVal = Object?.values(posts)
    console.log('Posts', posts)
    console.log('Current User', currentUser)
    useEffect(() => {
        dispatch(getAllPosts())

    }, [dispatch, JSON.stringify(postsVal)])
    return (
        <div className='results-of-search'>

            <h1>hi</h1>
        </div>
    )
}

export default ResultsPage
