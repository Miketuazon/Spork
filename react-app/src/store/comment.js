const GET_COMMENTS = 'comments/getComments'
const DELETE_COMMENT = 'comments/deleteComment'
const PUT_COMMENT = 'comments/putComment'
const POST_COMMENT = 'posts/postComment'


export const actionGetCurrentUserComments = (comments) => {
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

export const thunkGetCurrentUserComments = () => async dispatch => {
    const response = await fetch(`/api/comments/`)
    if (response.ok) {
        const res = await response.json()
        dispatch(actionGetCurrentUserComments(res))
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

const initialState = { userComments: null }

export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return {...state, userComments: action.comments}
        case DELETE_COMMENT:
            return {...state, userComments: state.userComments.filter(comment => comment.id !== action.commentId)};
        case PUT_COMMENT:
            return {...state, userComments: state.userComments.map(comment => comment.id === action.comment.id ? action.comment : comment)}
        case POST_COMMENT:
            return { ...state, userComments: [...state.userComments, action.comment] }
        default:
            return state
    }
}
