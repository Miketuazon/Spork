import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { thunkEditComment } from "../../../store/post";

export default function EditComment({ comment }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [content, setContent] = useState(comment?.content)
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const updateComment = {
            content: content
        }

        const updatedComment = await dispatch(thunkEditComment(updateComment, comment.id));
        if (updatedComment.errors) {
            setErrors(updatedComment.errors);
        } else {
            closeModal();
        }
    }

    return (
        <>
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
                <textarea
                    className="update-comment-textarea"
                    rows="8"
                    cols="60"
                    placeholder={comment?.content}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type='submit'>Reply</button>
            </form>
        </>
    )
}
