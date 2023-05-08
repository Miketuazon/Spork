import { useState } from "react";
import { useSelector } from "react-redux";
import "./CreatePost.css"

export default function CreatePost() {
    const currentUser = useSelector(state => state?.session?.user)

    console.log('currentUser', currentUser)
    return (
        <>
        <div className="create-post-nav">
            <form>
                <div className="create-post-username-gear">
                    <span className="create-post-username">{currentUser?.username}</span><i className="fa fa-gear"></i>
                </div>
                    <input
                        className="create-post-title"
                        type="text"
                        placeholder="Title"
                    />

                <div>
                    <textarea
                        className="create-post-textarea"
                        rows="8"
                        cols="60"
                        placeHolder="Go ahead, put anything."
                    />
                    <br></br>
                </div>
                <div className="create-post-icons">
                <span className="fa fa-image"></span>
                <span className="fa fa-gif"></span>
                <span className="fa fa-link"></span>
                <span className="fa fa-headphones"></span>
                <span className="fa fa-video"></span>
                <span className="fa fa-square-poll-vertical"></span>
                </div>
                <input
                    className="create-post-hashtag"
                    type="text"
                    placeholder="#add tags to help people find your post"
                />
                <ul className="create-post-close-for-everyone-post-now-button">
                    <span>
                        <button className="create-post-close-button">Close</button>
                    </span>
                    <span className="create-post-for-everyone-post-now-button">
                        <li>
                            <a>
                                <button className="create-post-for-everyone-button"><span>For Everyone </span><span className="fa fa-angle-down"></span></button>
                            </a>
                            <ul className="create-post-dropdown">
                                <li><a>1</a></li>
                                <li><a>2</a></li>
                                <li><a>3</a></li>
                                <li><a>4</a></li>
                            </ul>
                        </li>
                        <li>
                            <button className="create-post-post-now-button" ><span>Post now |</span><span className="fa fa-angle-down"></span></button>
                            <ul className="create-post-dropdown">
                                <li><a>1</a></li>
                                <li><a>2</a></li>
                                <li><a>3</a></li>
                                <li><a>4</a></li>
                            </ul>
                        </li>
                    </span>
                </ul>

            </form>
            </div>
        </>
    )
}

