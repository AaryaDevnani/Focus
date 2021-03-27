import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation , NavLink} from 'react-router-dom';
import { loginUserAction } from "../actions/index";

const Login = () => {

    let history = useHistory()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: "/dashboard" } };
    
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
        <NavLink to='/login' className='hoverLine'  style={navLinkStyleT}  >Login</NavLink>
            <span><b>or</b></span>
            <NavLink to='/register' className='hoverLine'  style={navLinkStyle}  >Register</NavLink>
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
const navLinkStyle={
    color: 'black',
    textDecoration: 'none',
    lineHeight:'70px',
    fontSize: '40px',
    padding:'8px 15px',
  }
const navLinkStyleT={
    color: '#008B8B',
    textDecoration: 'none',
    lineHeight:'70px',
    fontSize: '40px',
    padding:'8px 15px',
}

export default Login
