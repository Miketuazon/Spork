const GET_POSTS = 'posts/getPosts'
const POST_POST = 'posts/postPost'
const DELETE_POST = 'posts/deletePost'
const PUT_POST = 'posts/putPost'

const actionGetPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

const actionCreatePost = (post) => {
    return {
        type: POST_POST,
        post
    }
}

const actionDeletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

const putPost = (post) => {
    return {
        type: PUT_POST,
        post
    }
}

export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/')

    if (response.ok) {
        const posts = await response.json()
        dispatch(actionGetPosts(posts))
        return posts;
    } else {
        return response;
    }
}

export const getCurrentUserPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/current_user')
    if (response.ok) {
        const currentUserPosts = await response.json()
        dispatch(actionGetPosts(currentUserPosts))
    }
    // } else throw new Error("Bad Request")
}

export const thunkCreatePost = (post) => async (dispatch) => {
    const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })

    const data = await response.json();

    if (response.ok) {
        dispatch(actionCreatePost(data));
    }

    return data;

}

export const thunkDeletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/delete/${postId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(actionDeletePost(postId))
    }
}

export const updateOnePost = (post, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/edit/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })

    if (response.ok) {
        const res = await response.json()
        dispatch(putPost(res))
        return res
    }


}

const initialState = { posts: null }

export default function postsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            return {...state, posts: action.posts}
        case POST_POST:
            return { ...state, posts: [...state.posts, action.post] }
        case DELETE_POST:
            return {...state, posts: state.posts.filter(post => post.id !== action.postId)};
        case PUT_POST:
            newState = { ...state }
            newState[action.post.id] = action.post
            return newState
        default:
            return state
    }
}
