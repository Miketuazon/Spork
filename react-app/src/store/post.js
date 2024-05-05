const GET_POSTS = 'posts/getPosts'
const POST_POST = 'posts/postPost'
const DELETE_POST = 'posts/deletePost'
const PUT_POST = 'posts/putPost'
const POST_COMMENT = 'posts/postComment'

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

const actionPutPost = (post) => {
    return {
        type: PUT_POST,
        post
    }
}

const actionPostComment = (comment) => {
    return {
        type: POST_COMMENT,
        comment
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

export const thunkEditPost = (post, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/edit/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })

    const data = await response.json();

    if (response.ok) {
        dispatch(actionPutPost(data));
    } 

    return data;
}

export const thunkCreateComment = (comment, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    const data = await response.json();

    if (response.ok) {
        
        dispatch(actionPostComment(data));
        return data;
    } 

    return data;
}

const initialState = { allPosts: null }

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {...state, allPosts: action.posts}
        case POST_POST:
            return { ...state, allPosts: [...state.allPosts, action.post] }
        case DELETE_POST:
            return {...state, allPosts: state.allPosts.filter(post => post.id !== action.postId)};
        case PUT_POST:
            return {...state, allPosts: state.allPosts.map(post => post.id === action.post.id ? action.post : post)}
        case POST_COMMENT:
            console.log(action.comment)
            return { ...state, allPosts: state.allPosts.map(post => post.id === action.comment.postId ? {...post, comments: [...post.comments, action.comment]} : post) }
        default:
            return state
    }
}
