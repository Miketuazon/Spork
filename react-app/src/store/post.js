// Post Constants
const GET_POSTS = 'posts/getPosts'
const POST_POST = 'posts/postPost'
const DELETE_POST = 'posts/deletePost'
const PUT_POST = 'posts/putPost'

// Comment Constants
const POST_COMMENT = 'posts/postComment'
const DELETE_COMMENT = 'posts/deleteComment'
const PUT_COMMENT = 'posts/putComment'

// Like Constants
const ADD_LIKE = 'posts/addLike';
const REMOVE_LIKE = 'posts/removeLike';
const GET_LIKED_POSTS = 'posts/getLikedPosts';

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

// Like Action Creators
const actionAddLike = (postId, userId) => {
    return {
        type: ADD_LIKE,
        postId, userId
    }
}

const actionRemoveLike = (postId, userId) => {
    return {
        type: REMOVE_LIKE,
        postId, userId
    }
}

const actionGetLikedPosts = (likedPosts) => {
    return {
        type: GET_LIKED_POSTS,
        likedPosts
    }
}

// Post Thunks
export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/')

    const data = await response.json();

    if (response.ok) {
        dispatch(actionGetPosts(data))
    }

    return data;
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

// Like Thunks
export const thunkAddLike = (postId, userId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${postId}`)

    if (response.ok) {
        dispatch(actionAddLike(postId, userId))
    }
}

export const thunkRemoveLike = (postId, userId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${postId}`)

    if (response.ok) {
        dispatch(actionRemoveLike(postId, userId))
    }
}

export const thunkGetLikedPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts/likes")

    if (response.ok) {
        const likedPosts = await response.json()
        dispatch(actionGetLikedPosts(likedPosts))
    }
}

const initialState = { allPosts: null, likedPosts: null, currentUserPosts: null}

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {...state, allPosts: action.posts, currentUserPosts: action.posts.filter(post => post.userId === action.posts[0].userId), likedPosts: action.posts.filter(post => post.likes.includes(action.posts[0].userId))}
        case POST_POST:
            return { ...state, allPosts: [...state.allPosts, action.post] }
        case DELETE_POST:
            return {...state, allPosts: state.allPosts.filter(post => post.id !== action.postId)};
        case PUT_POST:
            return {...state, allPosts: state.allPosts.map(post => post.id === action.post.id ? action.post : post)}
        case POST_COMMENT:
            return { ...state, allPosts: state.allPosts.map(post => post.id === action.comment.postId ? {...post, comments: [...post.comments, action.comment]} : post), likedPosts: state.likedPosts.map(post => post.id === action.comment.postId ? {...post, comments: [...post.comments, action.comment]} : post), currentUserPosts: state.currentUserPosts.map(post => post.id === action.comment.postId ? {...post, comments: [...post.comments, action.comment]} : post)}
        case DELETE_COMMENT:
            for (let i = 0; i < state.allPosts.length; i++) {
                for (let j = 0; j < state.allPosts[i].comments.length; j++) {
                    if (state.allPosts[i].comments[j].id === action.commentId) {
                        state.allPosts[i].comments.splice(j, 1)
                    }
                }
            }

            for (let i = 0; i < state.likedPosts.length; i++) {
                for (let j = 0; j < state.likedPosts[i].comments.length; j++) {
                    if (state.likedPosts[i].comments[j].id === action.commentId) {
                        state.likedPosts[i].comments.splice(j, 1)
                    }
                }
            }
            
            return {...state, allPosts: [...state.allPosts], likedPosts: [...state.likedPosts]};
        case PUT_COMMENT:
            for (let i = 0; i < state.allPosts.length; i++) {
                for (let j = 0; j < state.allPosts[i].comments.length; j++) {
                    if (state.allPosts[i].comments[j].id === action.comment.id) {
                        state.allPosts[i].comments[j] = action.comment
                    }
                }
            }

            for (let i = 0; i < state.likedPosts.length; i++) {
                for (let j = 0; j < state.likedPosts[i].comments.length; j++) {
                    if (state.likedPosts[i].comments[j].id === action.comment.id) {
                        state.likedPosts[i].comments[j] = action.comment
                    }
                }
            }
            return {...state, allPosts: [...state.allPosts], likedPosts: [...state.likedPosts]};
        case ADD_LIKE:
            return {...state, allPosts: state.allPosts.map(post => post.id === action.postId ? {...post, likes: [...post.likes, action.userId]} : post), likedPosts: state.likedPosts.map(post => post.id === action.postId ? {...post, likes: [...post.likes, action.userId]} : post)}
        case REMOVE_LIKE:
            return {...state, allPosts: state.allPosts.map(post => post.id === action.postId ? {...post, likes: post.likes.filter(id => id !== action.userId)} : post), likedPosts: state.likedPosts.map(post => post.id === action.postId ? {...post, likes: post.likes.filter(id => id !== action.userId)} : post)}
        case GET_LIKED_POSTS:
            return {...state, likedPosts: action.likedPosts}
        default:
            return state
    }
}
