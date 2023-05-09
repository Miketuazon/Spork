import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOneComment } from "../../../store/post";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

export default function CreateComment({postId}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const currentUser = useSelector(state => state?.session?.user);
    const [content, setContent] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()
        const newComment = {
            content: content
        }
        dispatch(createOneComment(newComment, postId))
        closeModal()

    }

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <textarea
                    className="create-post-textarea"
                    rows="8"
                    cols="60"
                    placeholder="Go ahead, put anything."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type='submit'>Reply</button>
            </form>








        </>
    )



}
