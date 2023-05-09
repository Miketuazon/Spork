const DELETE_COMMENT = 'comments/deleteComment'


export const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const deleteOneComment = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/delete/${commentId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteComment(commentId))
    }
}



export default function commentsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
    case DELETE_COMMENT:
        newState = {...state}
        delete newState[action.commentId]
        return newState
    default:
        return state
    }
}
