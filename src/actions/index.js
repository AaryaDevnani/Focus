export const loginUserAction = (user) => ({
    type: "LOGIN",
    payload: user
})

export const logoutUserAction = () => ({
    type: "LOGOUT",
    payload: ""
})
