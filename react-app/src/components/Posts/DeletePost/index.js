import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOnePost } from "../../../store/post";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useModal } from "../../../context/Modal";
import "./DeletePost.css"

export default function DeletePost ({postId}){
const {closeModal} = useModal();
const history = useHistory();
const dispatch = useDispatch();

const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteOnePost(postId))
    closeModal()

}

const onCancel = (e) => {
    e.preventDefault();
    closeModal()
}

return (
    <div className="form-div">
        <div className="delete-post-title">Are you sure you want to delete this post?</div>
        {/* <form onSubmit={handleDelete} className="form"> */}
        <h3></h3>
        <button onClick={handleDelete} className="delete-post-submit-button" id="deleteSpot-button">
            Yes, delete this post
        </button>
        <button className="delete-post-cancel-button"type="button" onClick={onCancel}>
            Cancel
        </button>
        {/* </form> */}
    </div>
)



}
