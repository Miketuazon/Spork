const GET_FOLLOWERS = 'follow/getFollowers'

const getFollowers = (followers) => {
    return {
        type: GET_FOLLOWERS,
        followers
    }
}

export const getFollowsForUser = () => async dispatch => {
    const response = await fetch('/api/follow')
    console.log('followers res', response)
    if (response.ok) {
        const userFollows = await response.json()
        dispatch(getFollowers(userFollows))
    }
}

export default function followersReducer(state={}, action) {
    let newState;
    switch(action.type) {
    case GET_FOLLOWERS:
        newState={}
    action.follow.forEach((follow) => newState[follow.id] = follow)
    return newState
    default:
        return state
    }
}
