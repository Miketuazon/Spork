
const GET_POSTS = 'posts/getPosts'
const POST_POST = 'posts/postPost'
const DELETE_POST = 'posts/deletePost'
const PUT_POST = 'posts/putPost'
const POST_COMMENT = 'posts/postComment'


const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

const postComment = (comment) => {
    return {
        type: POST_COMMENT,
        comment
    }
}

const postPost = (post) => {
    return {
        type: POST_POST,
        post
    }
}

const deletePost = (postId) => {
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

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts')
    console.log('posts res', response)
    if (response.ok) {
        const posts = await response.json()
        dispatch(getPosts(posts))
    }
    // else throw new Error("Bad Request")
}

export const getCurrentUserPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/current_user')
    if (response.ok) {
        const currentUserPosts = await response.json()
        dispatch(getPosts(currentUserPosts))
    }
    // } else throw new Error("Bad Request")
}

export const createOnePost = (post) => async (dispatch) => {
    const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    }
    )
    if (response.ok) {
        const newPost = await response.json()
        dispatch(postPost(newPost))
        return newPost
    }

}

export const createOneComment = (comment, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const res = await response.json()
        dispatch(postComment(res))
        return res
    }

}

export const deleteOnePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/delete/${postId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deletePost(postId))
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

export default function postsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            newState = {}
            action.posts.forEach((post) => newState[post.id] = post)
            console.log('New State Post', newState)
            return newState
        case POST_POST:
            newState = { ...state }
            newState[action.post.id] = action.post
            return newState
        case DELETE_POST:
            newState = { ...state }
            delete newState[action.postId]
            return newState
        case PUT_POST:
            newState = { ...state }
            newState[action.post.id] = action.post
            return newState
        case POST_COMMENT:
            newState = { ...state }
            newState[action.comment.id] = action.comment
            return newState
        default:
            return state
    }
}
