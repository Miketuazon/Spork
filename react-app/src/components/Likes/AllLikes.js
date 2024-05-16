import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllPosts } from "../../store/post";
import { thunkGetLikedPosts } from "../../store/post";
import { useHistory } from "react-router-dom";
import PostItem from "../Posts/PostItem";
import LoadingScreen from "../LoadingScreen";
import "./AllLikes.css"
import "../Posts/Feed/Feed.css"

export default function AllLikes() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts.likedPosts);


    useEffect(() => {
        dispatch(thunkGetAllPosts());
        dispatch(thunkGetLikedPosts());
    }, [dispatch])

    if (!sessionUser) history.push('/')

    return (
        <>
        <div className="Feed">
          {posts ? (
              <ul className="posts">
                {Object.values(posts).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))?.map(post =>
                  (
                    <li key={post.id} className="post">
                      <PostItem post={post} />
                    </li>
                  ))}
              </ul>
          ) : (
          <>
            <div className="loading">
              <LoadingScreen />
            </div>
          </>
          )}
        </div>
        </>
      )
}
