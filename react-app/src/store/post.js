// Post Constants
const GET_POSTS = 'posts/getPosts'
const POST_POST = 'posts/postPost'
const DELETE_POST = 'posts/deletePost'
const PUT_POST = 'posts/putPost'

// Comment Constants
const POST_COMMENT = 'posts/postComment'
const DELETE_COMMENT = 'posts/deleteComment'
const PUT_COMMENT = 'posts/putComment'

// Post Action Creators
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

// Comment Action Creators
const actionPostComment = (comment) => {
    return {
        type: POST_COMMENT,
        comment
    }
}

const actionDeleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

const actionPutComment = (comment) => {
    return {
        type: PUT_COMMENT,
        comment
    }
}

// Post Thunks
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

// Comment Thunks
export const thunkCreateComment = (comment, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    const data = await response.json();

    if (response.ok) {
        dispatch(actionPostComment(data));
    } 

    return data;
}

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/delete/${commentId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(actionDeleteComment(commentId))
    }

}

export const thunkEditComment = (comment, commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/edit/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    const data = await response.json();

    if (response.ok) {
        dispatch(actionPutComment(data));
    } 

    return data;
}

const initialState = { allPosts: null}

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
            return { ...state, allPosts: state.allPosts.map(post => post.id === action.comment.postId ? {...post, comments: [...post.comments, action.comment]} : post)}
        case DELETE_COMMENT:
            for (let i = 0; i < state.allPosts.length; i++) {
                for (let j = 0; j < state.allPosts[i].comments.length; j++) {
                    if (state.allPosts[i].comments[j].id === action.commentId) {
                        state.allPosts[i].comments.splice(j, 1)
                    }
                }
            }
            
            return {...state, allPosts: [...state.allPosts]};
        case PUT_COMMENT:
            for (let i = 0; i < state.allPosts.length; i++) {
                for (let j = 0; j < state.allPosts[i].comments.length; j++) {
                    if (state.allPosts[i].comments[j].id === action.comment.id) {
                        state.allPosts[i].comments[j] = action.comment
                    }
                }
            }
            return {...state, allPosts: [...state.allPosts]};
        default:
            return state
    }
}
