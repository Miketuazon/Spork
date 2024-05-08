import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditPost } from "../../../store/post";
import { useModal } from "../../../context/Modal";
import "./EditPost.css"

export default function EditPost({ post }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.session?.user)
    const [content, setContent] = useState(post?.content)
    const [title, setTitle] = useState(post?.title)
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([]);
        const updatePost = {
            post_type: 'Text',
            title: title,
            content: content
        }
        const updatedPost = await dispatch(thunkEditPost(updatePost, post.id));
        if (updatedPost.errors) {
            setErrors(updatedPost.errors);
        } else {
            closeModal();
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
            <div className="update-post-nav">
                <form onSubmit={onSubmit}>
                <ul>
                    {errors.length > 0 ? (
                            <>
                                {errors?.map((error, idx) => (
                                    <li className="error-message" key={idx}>{error}</li>
                                ))}
                            </>
                        ) : (
                            <></>
                        )}
                    </ul>
                    <div className="update-post-username-gear">
                        <span className="update-post-username">{currentUser?.username}</span><i className="fa fa-gear"></i>
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
                            className="update-post-textarea"
                            rows="8"
                            cols="60"
                            placeholder={post?.content}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <br></br>
                    </div>
                    <div className="update-post-icons">
                        <span className="fa fa-image"></span>
                        <span className="fa fa-gif"></span>
                        <span className="fa fa-link"></span>
                        <span className="fa fa-headphones"></span>
                        <span className="fa fa-video"></span>
                        <span className="fa fa-square-poll-vertical"></span>
                    </div>
                    <span className="update-post-hashtag">
                        You can remove the title but if you try to remove content below 3 characters we will discard your changes.
                    </span>
                    <li>
                        <button type="submit" className="update-post-post-now-button" ><span>Post now </span><span className="fa fa-angle-down"></span></button>
                    </li>
                </form>
                <ul className="update-post-close-for-everyone-post-now-button">
                    <span>
                        <button onClick={handleCancel} className="update-post-close-button">Close</button>
                    </span>
                    <span className="update-post-for-everyone-post-now-button">
                        <li>
                            <a>
                                <button className="update-post-for-everyone-button"><span>For Everyone </span><span className="fa fa-angle-down"></span></button>
                            </a>
                        </li>
                    </span>
                </ul>
            </div>
        </>
    )
}
