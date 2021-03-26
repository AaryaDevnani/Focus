import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUserAction } from '../actions'

function Logout() {

    const dispatch = useDispatch()
    const logoutUser = async () => {
        await dispatch(logoutUserAction())
        window.location.replace('http://localhost:3000/')
    }
    logoutUser()

    return (
        <div>
            Logout Page
        </div>
    )
}

export default Logout
