const GET_USERS = 'users/getUsers'

const getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    }
}




export const getAllUsers = () => async (dispatch) => {
    const response = await fetch('/api/users')
    if (response.ok) {
        const res = await response.json()
        dispatch(getUsers(res))
    }
}


export default function usersReducer(state = {}, action) {
    let newState;
    switch (action.type) {
    case GET_USERS:
    newState = {}
    action.users.forEach(user => {
        newState[user.id] = user
    })
    return newState;
    default:
         return state
    }
}
