import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "../Posts/PostItem";
import { thunkGetAllPosts } from "../../store/post";
import "./AllLikes.css"
import Test from "../Test";

export default function AllLikes() {
    const sessionUser = useSelector(state => state?.session.user)
    const sessionUserLikes = sessionUser?.likes
    const sessionUserLikesLength = sessionUser?.likes?.length
    const sessionUserLikesVal = Object?.values(sessionUserLikes)
    const dispatch = useDispatch()
    const postsLikes = useSelector(state => state?.posts)
    const postsLikesVal = Object?.values(postsLikes)


    useEffect(() => {
        dispatch(thunkGetAllPosts())
        // dispatch(getCommentsForPost(postId))
        // dispatch(getCommentsForPost(postId))
    }, [dispatch, JSON.stringify(sessionUserLikesVal), JSON.stringify(postsLikesVal)])

    return (
        <div className="AllLikes">
            <div>
                <ul className="likes-posts">
                    {sessionUserLikes?.length > 0 ? Object?.values(postsLikes)?.map(post => {

                    return (
                        <li key={post?.id} className="post2">
                            <Test post={post}/>
                        </li>

                    )

}) : <div><h1 className="no-likes">You haven't liked anything</h1></div>}
                </ul>
            </div>
        </div>

    )
}
