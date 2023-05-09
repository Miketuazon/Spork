import { useState } from "react";
import { useSelector } from "react-redux";
import "./CreatePost.css"

export default function CreatePosts() {
    return (
        <>
            <form>
                <div className="create-post-username-gear">
                    <span className="create-post-username">username</span><i className="fa fa-gear"></i>
                </div>
                <h3>Title</h3>
                <span className="fa fa-image"></span>
                <span className="fa fa-gif"></span>
                <span className="fa fa-link"></span>
                <span className="fa fa-headphones"></span>
                <span className="fa fa-video"></span>
                <span className="fa fa-square-poll-vertical"></span>
                <div>
                    <textarea
                        className="create-post-textarea"
                        rows="10"
                        cols="60"
                        placeholder="Go ahead, put anything."
                    />
                </div>
                <br></br>
                <ul className="create-post-close-for-everyone-post-now-button">
                    <span>
                        <button className="create-post-close-button">Close</button>
                    </span>
                    <span className="create-post-for-everyone-post-now-button">
                        <button className="create-post-for-everyone-button">For Everyone v</button><button className="create-post-post-now-button" >Post now | v</button>
                    </span>
                </ul>
            </form>

        </>
    )
}
