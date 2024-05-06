import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreatePost } from "../../../store/post";
import { useModal } from "../../../context/Modal";
import "./CreatePost.css"

export default function CreatePost() {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.session?.user)
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            post_type: 'text',
            title: title,
            content: content
        }
        const successPost = await dispatch(thunkCreatePost(newPost))
        if (successPost.errors) {
            setErrors(successPost.errors)
            console.log(successPost)
        } else closeModal();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
            <div className="create-post-nav">
                <form>
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
                    <div className="create-post-username-gear">
                        <span className="create-post-username">{currentUser?.username}</span>
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
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <br></br>
                    </div>
                    <span className="create-post-hashtag">You can leave title empty but you cannot create a post with less than 3 characters</span>
                </form>
                <ul className="create-post-close-for-everyone-post-now-button">
                    <span>
                        <button onClick={handleCancel} className="create-post-close-button">Close</button>
                    </span>
                    <span className="create-post-for-everyone-post-now-button">
                        <li>
                        </li>
                        <li>
                            <button onClick={onSubmit} className="create-post-post-now-button" ><span>Post now |</span><span className="fa fa-angle-down"></span></button>
                        </li>
                    </span>
                </ul>
            </div>
        </>
    )
}
