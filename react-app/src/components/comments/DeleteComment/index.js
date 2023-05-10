import { deleteOneComment } from "../../../store/comment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";


export default function ({commentId}) {
const dispatch = useDispatch()
const {closeModal} = useModal()

const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(deleteOneComment(commentId))
    closeModal()
}
    return (
        <div className=" delete-button-page">
        <form className="delete-button-page" onSubmit={onSubmit}>
        <div className="question-delete"> You definitely want to delete this reply? </div>
        <button type='submit-button-page'>Delete</button>

        </form>
        </div>
    )
}
