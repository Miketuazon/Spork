// User Constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// Follow Constants
const ADD_FOLLOW = "session/ADD_FOLLOW";
const REMOVE_FOLLOW = "session/REMOVE_FOLLOW";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const actionAddFollow = (userId) => ({
	type: ADD_FOLLOW,
	userId
});

const actionRemoveFollow = (userId) => ({
	type: REMOVE_FOLLOW,
	userId
});

const initialState = { user: null };

// Thunks
// User Thunks
export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return ["Invalid credentials"]
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return (Object.values(data.errors));
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

// Follow Thunks
export const thunkAddFollow = (userId) => async (dispatch) => {
	const response = await fetch(`/api/follow/${userId}`);

	if (response.ok) {
		dispatch(actionAddFollow(userId));
	}
}

export const thunkRemoveFollow = (userId) => async (dispatch) => {
	const response = await fetch(`/api/follow/${userId}`);

	if (response.ok) {
		dispatch(actionRemoveFollow(userId));
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case ADD_FOLLOW:
			return { user: { ...state.user, following: [...state.user.following, action.userId] } }
		case REMOVE_FOLLOW:
			return { user: { ...state.user, following: state.user.following.filter(id => id !== action.userId) } }
		default:
			return state;
	}
}
