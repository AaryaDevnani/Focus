import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import ForumMessages from './ForumMessages'
import '../forum.css'

function Forum() {

    let history = useHistory()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: "/login" } };

    const auth = useSelector(state => state.auth)
    if (!auth.loggedIn) {
        history.replace(from)
    }
    
    const [messages, setMessages] = useState([])

    const getMessages = async () => {
		const response = await fetch(`/api/forums`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		if (data.error_message === "") {
			setMessages(data.messages)
		}
	}

    const [userInput, setUserInput] = useState({
		message: '',
		label: 'general',
        user_id: auth.user.id,
        username: auth.user.username
	})

    const handleOnChange = (e) => {
		setUserInput({ ...userInput, [e.target.name]: e.target.value })
	}
    
    const handleOnSubmit = (e) => {
		e.preventDefault()
        console.log("reached on submit")
		addMessage()
	}

    const messageOptions = {
		method: 'POST',
		body: JSON.stringify(userInput),
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const addMessage = async () => {
		const response = await fetch(`/api/forum/${userInput.label}`, messageOptions)
		const data = await response.json()
		if (data.error_message === "") {
			setUserInput({
				message: '',
                label: 'general',
                user_id: auth.user.id,
                username: auth.user.username
			})
            getMessages()
		} else {
			alert(data.error_message)
		}
	}
    
    useEffect(() => {
        getMessages()
    }, [])
    
    return (
        <div>
            <div className="containerForum bootstrap snippets bootdey">
                <div className="row">
                    <div className="col-md-12 bg-white ">
                        <div className="chat-message">
                            <form onSubmit={handleOnSubmit}>
                                <label className='forumLabel'>Message  </label>
                                <label className='forumLabel2'>Label  </label>
                                <div className="input-group">
                                    <input className="form-control border no-shadow no-rounded" placeholder="Type your message here" name="message" value={userInput.message} onChange={handleOnChange} />
                                    <div>        
                                        <select id="label" className='selectTag center' name="label" onChange={handleOnChange}>
                                            <option className="center" value="general" selected>General</option>
                                            <option className="center" value="browsing_history">Browsing History</option>
                                            <option className="center" value="social_media">Social Media</option>
                                        </select>
                                    </div>
                                    <span className="input-group-btn">
                                        <button className="btn btn-success no-rounded" type="submit">Send</button>
                                    </span>
                                </div>
                            </form>
                            <ul className="chat">
                                <ForumMessages messages={messages} />
                            </ul>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    )
}


export default Forum
