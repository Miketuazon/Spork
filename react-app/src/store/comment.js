const DELETE_COMMENT = 'comments/deleteComment'
const PUT_COMMENT = 'comments/putComment'


export const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const putComment = (comment) => {
    return {
        type: PUT_COMMENT,
        comment
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

export const updateOneComment = (comment, commentId) => async dispatch => {
    const response = await fetch(`/api/comments/edit/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const res = await response.json()
        dispatch(putComment(res))
        return res
    }
}

export default function commentsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
    case DELETE_COMMENT:
        newState = {...state}
        console.log('Delete NewState', newState)
        delete newState[action.commentId]
        console.log('Delete 2 NewState', newState)
        return newState
    case PUT_COMMENT:
        newState = {...state}
        newState[action.comment.id] = action.comment
        return newState
    default:
        return state
    }
}
