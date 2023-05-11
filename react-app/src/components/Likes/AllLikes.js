import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../store/post";
import PostItem from "../Posts/PostItem";
import { getComments } from "../../store/comment";

export default function AllLikes() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const posts = useSelector(state => state?.posts)
    const currentUser = useSelector(state => state?.session?.user)
    const postsVal = Object?.values(posts)
    const postId = postsVal?.id
    const comments = useSelector(state => state?.comments)
    const commentId = comments?.id
    const commentsVal = Object?.values(comments)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch, JSON.stringify(postsVal), JSON.stringify(commentsVal), JSON.stringify(comments)])


    return (
        <div>
            <ul className="posts">
                {sessionUser.likes.map(post => (
                    <li key={post?.id} className="post">
                        <PostItem post={post} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
