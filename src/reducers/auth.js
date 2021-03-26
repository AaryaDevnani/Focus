const initialState = {
    loggedIn: false,
    user: {
        id: "",
        username: ""
    }
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case "LOGIN":
        return { loggedIn: true, user: payload }
    case "LOGOUT":
        return { loggedIn: false, user: { id: "", username: "" } }

    default:
        return state
    }
}

export default authReducer
