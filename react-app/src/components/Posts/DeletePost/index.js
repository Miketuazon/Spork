import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOnePost } from "../../../store/post";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useModal } from "../../../context/Modal";

export default function DeletePost ({postId}){
const {closeModal} = useModal();
const history = useHistory();
const dispatch = useDispatch();

const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(deleteOnePost(postId))
    closeModal()

}

const onCancel = (e) => {
    e.preventDefault();
    closeModal()
}

return (
<>
<span><button onClick={onSubmit}>Ok</button></span><span><button onClick={onCancel}>Cancel</button></span>
</>
)



}
