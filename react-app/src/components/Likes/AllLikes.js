import React from "react";
import { useEffect } from "react"

export default function AllLikes() {
    const sessionUser = useSelector(state => state.session.user)
    // console.log("sessionUser in ALl likes",sessionUser)
    // const likesObj = useSelector((state) => state.posts.allLikes)
    // const likes = Object.values(likesObj)

    // if (likes.length) return <h1 Hi />

    // test data
    const likes = {
           likes: [
            {
                userId: 4,
                userName: "User_Mike",
                name: "Mike"
            },
            {
                userId: 5,
                userName: "User_Brian",
                name: "Brian"
            },
        ]


    }
    const likesArr = Object.values(likes)
    console.log(likesArr)

    return (
        <div className="likes-container">

            <div className="users-container">
                {/* # likes > 0 ? map through all users that liked the post : return <div>Return the first like!</div>*/}
                <div className="user-container">

                    <span className="username-of-user-like">Username 1</span>
                    <span className="name-of-user-like">Name 1</span>
                </div>
            </div>
            {/* will need to implement: currUser following this user ? show follow button : return null */}
            <div className="follow-button">Follow</div>
        </div>
    )
}
