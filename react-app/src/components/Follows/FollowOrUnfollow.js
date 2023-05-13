import { getFollowsForUser } from "../../store/follow";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function FollowOrUnfollow ({userId}) {
const dispatch = useDispatch()
const currentUser = useSelector(state => state?.session?.user)
const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getFollowsForUser(userId))
}

return (
    <>
    <button onSubmit={onSubmit}>Help</button>
    </>
)
}
