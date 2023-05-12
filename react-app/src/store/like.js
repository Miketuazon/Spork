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
