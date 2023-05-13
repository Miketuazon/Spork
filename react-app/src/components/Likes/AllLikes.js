import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "../Posts/PostItem";
import { getAllPosts } from "../../store/post";
import "./AllLikes.css"

export default function AllLikes() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const posts = useSelector(state => state?.posts)
    useEffect(() => {
        dispatch(getAllPosts())
        // dispatch(getCommentsForPost(postId))
        // dispatch(getCommentsForPost(postId))
    }, [dispatch, JSON.stringify(posts), JSON.stringify(posts?.comments), JSON.stringify(posts?.likes),])

    return (
        <div className="AllLikes">
            <div>
                <ul className="posts">
                    {sessionUser.likes.length > 0 ? sessionUser.likes.map(post => (
                        <li key={post.id} className="post">
                            <PostItem post={post} />
                        </li>
                    )) : <h1 className="no-likes">You haven't liked anything</h1>}
                </ul>
            </div>
        </div>

    )
}
