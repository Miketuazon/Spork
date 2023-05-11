import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOnePost } from "../../../store/post";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

export default function CreateLinkPost() {
    const history = useHistory()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.session?.user)
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [post_type, setPostType] = useState('')
    const onSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            post_type: "text",
            title: title,
            content: content
        }
        const successPost = dispatch(createOnePost(newPost))
        if (successPost) {
            closeModal()
        }

    }

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }
    console.log('currentUser', currentUser)
    return (
        <>
            <div className="create-post-nav">
                <form>
                    <div className="create-post-username-gear">
                        <span className="create-post-username">{currentUser?.username}</span><i className="fa fa-gear"></i>
                    </div>
                    <input
                        className="update-post-title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />


                    <div>
                        <textarea
                            className="create-post-textarea"
                            rows="8"
                            cols="60"
                            placeholder="Go ahead, put anything."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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

                </form>
                <ul className="create-post-close-for-everyone-post-now-button">
                    <span>
                        <button onClick={handleCancel} className="create-post-close-button">Close</button>
                    </span>
                    <span className="create-post-for-everyone-post-now-button">
                        <li>

                            <ul className="create-post-dropdown">
                                <li><a>1</a></li>
                                <li><a>2</a></li>
                                <li><a>3</a></li>
                                <li><a>4</a></li>
                            </ul>
                        </li>
                        <li>
                            <button onClick={onSubmit} className="create-post-post-now-button" ><span>Post now |</span><span className="fa fa-angle-down"></span></button>
                            <ul className="create-post-dropdown">
                                <li><a>1</a></li>
                                <li><a>2</a></li>
                                <li><a>3</a></li>
                                <li><a>4</a></li>
                            </ul>
                        </li>
                        {/* <div>
                        <li>
                            <button onSubmit={onSubmit} className="create-post-post-now-button" ><span>Post now |</span><span className="fa fa-angle-down"></span></button>
                            <ul className="create-post-dropdown">
                                <li><a>1</a></li>
                                <li><a>2</a></li>
                                <li><a>3</a></li>
                                <li><a>4</a></li>
                            </ul>
                        </li>
                        </div> */}
                    </span>
                </ul>

                {/* </form> */}
            </div>
        </>
    )
}
