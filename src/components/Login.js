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
        console.log(data)
		if (data.error_message === "") {
            console.log(data)
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
    <form  onSubmit={handleOnSubmit} >
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
                name="password"
                value={userInput.password}
                onChange={handleOnChange}
            /> 
        </div>
        <input type='submit' className='btn btn-block' value='Login'/>
    </form>
    )
}

export default Login
