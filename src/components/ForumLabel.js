import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import ForumSideNav from './ForumSideNav'
import ForumMessages from './ForumMessages'

function ForumLabel({match}) {

    let history = useHistory()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: "/login" } };

    const auth = useSelector(state => state.auth)
    // if (!auth.loggedIn) {
    //     history.replace(from)
    // }
    
    const [messages, setMessages] = useState([])

    const getMessages = async () => {
		const response = await fetch(`/api/forum/${match.params.label}`, {
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
    }, [match.params.label])
    
    return (
        <div>
            <ForumSideNav />
            <ForumMessages messages={messages} />
        </div>
    )
}

export default ForumLabel

