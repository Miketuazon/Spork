import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "../Posts/PostItem";
import "./AllLikes.css"

export default function AllLikes() {
    const sessionUser = useSelector(state => state?.session.user)
    const dispatch = useDispatch()


    useEffect(() => {

    }, [dispatch])

    return (
        <>
            <div>
                <h1 className="all-likes-header">All Likes</h1>
            </div>
        </>
    )
}
