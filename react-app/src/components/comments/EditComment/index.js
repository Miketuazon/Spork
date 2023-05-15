import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateOneComment } from "../../../store/comment";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useModal } from "../../../context/Modal";


export default function EditComment({ comment }) {
    const commentId = comment?.id
    const history = useHistory()
    const { closeModal } = useModal()
    const [content, setContent] = useState(comment?.content)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.session?.user)

    const onSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            content: content
        }
        // dispatch(updateOneComment(comment, commentId))
        const updatedComment = dispatch(updateOneComment(comment, commentId))
        if (updatedComment) {
            closeModal()
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
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
