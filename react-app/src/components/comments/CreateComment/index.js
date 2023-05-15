import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { createOneComment } from "../../../store/post";
import { createOneComment } from "../../../store/comment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./CreateComment.css"

export default function CreateComment({ postId }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentUser = useSelector(state => state?.session?.user);
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault()
        const newComment = {
            content: content
        }
        const successComment = await dispatch(createOneComment(newComment, postId))
        if (successComment) {
            setErrors(successComment)
        } else {
            setContent('')
            closeModal()
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
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
