
const GET_POSTS = 'posts/getPosts'

const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts')
    if (response.ok) {
        const posts = await response.json()
        dispatch(getPosts(posts))
    } else throw new Error("Bad Request")
}

export const getCurrentUserPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/current_user')
    if (response.ok) {
        const currentUserPosts = await response.json()
        dispatch(getPosts(currentUserPosts))
    }
    // } else throw new Error("Bad Request")
}

export default function postsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            newState = {}
            action.posts.forEach((post) => newState[post.id] = post)
            return newState
        default:
            return state
    }
}
