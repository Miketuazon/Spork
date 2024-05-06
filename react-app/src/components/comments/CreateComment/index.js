import { useDispatch } from "react-redux";
import { thunkCreateComment } from "../../../store/post";
import { useState } from "react";
import { useModal } from "../../../context/Modal";
import "./CreateComment.css"

export default function CreateComment({ postId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        
        const newComment = {
            content: content
        }
        const successComment = await dispatch(thunkCreateComment(newComment, postId))
        if (successComment.errors) {
            setErrors(successComment.errors)
        } else {
            setContent('')
            closeModal()
        }
    }

    return (
        <>
            <ul>
                {errors.map((error, idx) => (
                    <li className="error-message" key={idx}>{error}</li>
                ))}
            </ul>
            <div className="user-picture-comments">
                <img className="user-cone-comments" src="https://assets.tumblr.com/images/default_avatar/cone_open_64.png" alt="default_image.png" />
                <form className="create-post-area-comments-form" onSubmit={onSubmit}>
                    <textarea className="create-post-textarea-comments"
                        rows="1"
                        cols="10"
                        placeholder="Go ahead, put anything."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button className='submit-comment' ><i className="fa fa-reply"></i></button>
                </form>
            </div>
        </>
    )
}
