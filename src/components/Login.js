import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import { loginUserAction } from "../actions/index";

const Login = () => {

    let history = useHistory()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: "/forums" } };
    
    const dispatch = useDispatch()
    
    const [userInput, setUserInput] = useState({
		username: '',
		password: '',
	})

	const handleOnChange = (e) => {
		setUserInput({ ...userInput, [e.target.name]: e.target.value })
	}

    const handleOnSubmit = (e) => {
		e.preventDefault()
		loginUser()
	}

	const loginOptions = {
		method: 'POST',
		body: JSON.stringify(userInput),
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const loginUser = async () => {
		const response = await fetch('/api/login', loginOptions)
		const data = await response.json()
		if (data.error_message === "") {
            dispatch(loginUserAction({id: data.user_id, username: data.username}))
			setUserInput({
				username: '',
				password: '',
			})
            history.replace(from)
		} else {
			alert(data.error_message)
		}
	}

    return (
    
    <form className='add-form' onSubmit={handleOnSubmit} >
        <div className='center'>
            <button className='loginBtn' ><a href='./login' className='loginBtn'>Login</a></button>
            <span><b>or</b></span>
            <button className='loginBtn' onClick=''><a href='./register' className='loginBtn'>Register</a></button>
        </div>
        <div className='loginContainer'>
        <div className='form-contro '>
            <label className='label'>Username</label>
            <input
             type='text' required='required'  
             name="username"
             placeholder='Enter Username' 
             value={userInput.username}
             onChange={handleOnChange}
            /> 
        </div>
        <div className='form-contro '>
            <label className='label'>Password</label>
            <input 
                type='password' 
                required='required' 
                placeholder='Enter password'
                name="password"
                value={userInput.password}
                onChange={handleOnChange}
            /> 
        </div>
        <input type='submit' className='butn butn-block' value='Login'/>
        </div>
    </form>
    )
}

export default Login
