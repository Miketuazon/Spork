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
        <button onClick={onSubmit} type='submit'>Delete</button>
    )
}
