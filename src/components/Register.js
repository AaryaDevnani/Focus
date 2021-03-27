import React, {useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom';

const Register = () => {
    let history = useHistory()
    let location = useLocation()
    let { from } = location.state || { from: { pathname: "/login" } };

    const [userInput, setUserInput] = useState({
        username: '',
        email:'',
        phone_number: '',
        password: '',
        confirm_password: '',
	})
    const handleOnChange = (e) => {
		setUserInput({ ...userInput, [e.target.name]: e.target.value })
	}
    const handleOnSubmit = (e) => {
		e.preventDefault()
        if(userInput.password != userInput.confirm_password){
            alert('Password does not match')
            return
        }
		registerUser()
	}
    const registerOptions = {
		method: 'POST',
		body: JSON.stringify(userInput),
		headers: {
			'Content-Type': 'application/json',
		},
	}
    const registerUser = async () => {
		const response = await fetch('/api/register', registerOptions)
		const data = await response.json()
		if (data.error_message === "") {
			setUserInput({
				username: '',
                email:'',
                phone_number: '',
                password: '',
                confirm_password: '',
			})
            history.replace(from)
		} else {
			alert(data.error_message)
		}
	}


    return (
        <form className='add-formr' onSubmit={handleOnSubmit}  >
        <div className='center'>
        <button className='loginBtn' ><a href='./login' className='loginBtn'>Login</a></button>
        <span><b>or</b></span>
        <button className='loginBtn' onClick=''><a href='./register' className='loginBtn'>Register</a></button>
        </div>
        <div className='loginContainer'>
        <div className='form-contro'>
            <label className='label'>Parent/Guardian Username</label>
            <input
             type='text' required='required' 
             placeholder='Enter username' 
             name='username'     
             value={userInput.name}
             onChange={handleOnChange}
            /> 
        </div>
        <div className='form-contro'>
            <label className='label'>Email</label>
            <input
             type='email' required='required'
             name='email' placeholder='Enter Email ID'    
             value={userInput.email}
             onChange={handleOnChange}  
            /> 
        </div>
        <div className='form-contro'>
            <label className='label'>Phone Number</label>
            <input
             type='tel'  required='required'  
             placeholder='Enter 10 digit phone number' pattern="[0-9]{10}" 
             name='phone_number'     
             value={userInput.phone_number}
             onChange={handleOnChange}
            /> 
        </div>
        <div className='form-contro '>
            <label className='label' >Password</label>
            <input type='password' required='required'
            placeholder='Enter Password'
            name='password'     
            value={userInput.password}
            onChange={handleOnChange}
            /> 
        </div>
        <div className='form-contro '>
            <label className='label'>Confirm Password</label>
            <input type='password' required='required'
            placeholder='Re-enter Password'
            name='confirm_password'     
            value={userInput.confirm_password}
            onChange={handleOnChange}
            /> 
        </div>
       
        <input type='submit' className='butn butn-block' value='Register'/>
        </div>
    </form>
    )
}

export default Register
