const DELETE_COMMENT = 'comments/deleteComment'
const PUT_COMMENT = 'comments/putComment'
const GET_COMMENTS = 'comments/getComments'
const POST_COMMENT = 'posts/postComment'


export const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const postComment = (comment) => {
    return {
        type: POST_COMMENT,
        comment
    }
}


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

export const getCommentsForPost = (postId) => async dispatch => {
    const response = await fetch(`/api/comments/${postId}`)
    if (response.ok) {
        const res = await response.json()
        dispatch(getComments(res))
    }
}
export const createOneComment = (comment, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(postComment(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
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
        case GET_COMMENTS:
            newState = {}
            action?.comments?.forEach((comment) => newState[comment?.id] = comment)
            return newState;
        case DELETE_COMMENT:
            newState = { ...state }
            delete newState[action.commentId]
            return newState
        case PUT_COMMENT:
            newState = { ...state }
            newState[action.comment.id] = action.comment
            return newState
        case POST_COMMENT:
            newState = { ...state }
            newState[action.comment.id] = action.comment
            return newState
        default:
            return state
    }
}
