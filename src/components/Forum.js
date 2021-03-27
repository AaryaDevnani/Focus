import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import ForumMessages from './ForumMessages'
import ForumSideNav from './ForumSideNav'

function Forum() {

    let history = useHistory()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: "/login" } };

    const auth = useSelector(state => state.auth)
    // if (!auth.loggedIn) {
    //     history.replace(from)
    // }
    
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

    useEffect(() => {
        getMessages()
    }, [])
    
    return (
        <div>
            <ForumSideNav />
            <ForumMessages messages={messages} />
        </div>
    )
}

export default Forum
