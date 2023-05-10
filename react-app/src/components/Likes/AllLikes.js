import React from "react";
import { useSelector } from "react-redux";
import LikesPostItem from "./LikesPostItem"

export default function AllLikes() {
    const sessionUser = useSelector(state => state.session.user)


    return (
        <div>
            <ul className="posts">
                {sessionUser.likes.map(post => (
                    <li key={post.id} className="post">
                        <LikesPostItem post={post} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
