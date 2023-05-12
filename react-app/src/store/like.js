const POST_LIKE = 'posts/like'

const likePost = (like) => {
    return {
        type: POST_LIKE,
        like
    }
}

export const likeOnePost = (postId) => async dispatch => {
    const response = await fetch(`/api/likes/${postId}`)

    if (response.ok) {
        const postLike = await response.json()
        dispatch(likePost(postLike))
    }
}


export default function likesReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case POST_LIKE:
            newState = {}
            action.like.forEach(element => {
                newState[element.id] = element
            });
            return newState;
        default:
            return state
    }
}
