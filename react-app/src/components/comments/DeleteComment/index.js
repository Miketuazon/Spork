//import { deleteOneComment, getCommentsForPost } from "../../../store/comment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";


export default function ({commentId}) {
const dispatch = useDispatch()
const {closeModal} = useModal()
const posts = useSelector(state => state?.posts)


const onSubmit = async (e) => {
    e.preventDefault();
    //dispatch(deleteOneComment(commentId))

}
    return (
       <>
            <div onClick={onSubmit}>
                <i className="fas fa-trash-alt"></i> </div>
        </>
    )
}
