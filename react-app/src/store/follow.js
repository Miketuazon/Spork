const GET_FOLLOWERS = 'follow/getFollowers'

const getFollowers = (follow) => {
    return {
        type: GET_FOLLOWERS,
        follow
    }
}

export const getFollowsForUser = (userId) => async dispatch => {
    const response = await fetch(`/api/follow/${userId}`)
    if (response.ok) {
        const userFollows = await response.json()
        dispatch(getFollowers(userFollows))
    }
}

// export default function followersReducer(state = {}, action) {
//     let newState;
//     switch (action.type) {
//         case GET_FOLLOWERS:
//             newState = {}
//             action?.follow?.forEach((foll) => {
//                 newState[foll?.id] = foll
//             })
//             return newState;
//         default:
//             return state
//     }
// }
