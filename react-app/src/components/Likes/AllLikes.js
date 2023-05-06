import React from "react";
import { useSelector } from "react-redux";

export default function AllLikes() {
    const sessionUser = useSelector(state => state.session.user)
    // console.log("sessionUser in ALl likes",sessionUser)
    // const likesObj = useSelector((state) => state.posts.allLikes)
    // const likes = Object.values(likesObj)

    // test data
    const likesData = [
        {
            id: 1,
            userId: 4,
            userName: "User_Mike",
            name: "Mike"
        },
        {
            id: 2,
            userId: 5,
            userName: "User_Brian",
            name: "Brian"
        },
        {
            id: 3,
            userId: 6,
            userName: "User_Derrick",
            name: "Derrick"
        },
        {
            id: 4,
            userId: 7,
            userName: "User_Kisha",
            name: "Kisha"
        },
    ]



    const likes = Object.values(likesData)
    console.log(likes)
    console.log(sessionUser)
    return (
        <div className="likes-container">
            {/* # likes > 0 ? map through all users that liked the post : return <div>Return the first like!</div>*/}
            { likes.length > 0 ?
                likes.map(like => {
                    console.log("like ->", like)
                    return (
                        <div key={like.id} className="likes">
                            <div className="like-owner">
                                <div className="like-owner-username">{like.userName}</div>
                                <div className="like-owner-username">{like.name}</div>
                            </div>
                            {/* will need to implement: currUser following this user ? show follow button : return null */}
                            <button className="follow-button">Follow</button>
                        </div>
                    )
                })
            : <>Be the first one to follow!</>
            }
        </div>
    )
}
