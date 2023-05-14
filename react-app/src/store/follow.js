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
