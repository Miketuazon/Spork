const POST_LIKE = 'posts/like'

const likePost = (likes) => {
    return {
        type: POST_LIKE,
        likes
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
        // case POST_LIKE:
        //     newState = {}
        //     action?.likes?.forEach((like) => {
        //         newState[like?.id] = like
        //     })
        //     return newState;
        // case POST_LIKE:
        //     // newState= {}
        //     // let review = prevState.review
        //     newState = {}
        //     newState[action?.likes?.id] = action?.likes;
        //     return newState;

        default:
            return state
    }
}
