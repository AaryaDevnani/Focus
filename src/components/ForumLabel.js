import React, {useState, useEffect} from 'react'
import ForumSideNav from './ForumSideNav'
import ForumMessages from './ForumMessages'

function ForumLabel({match}) {

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
    }, [])
    
    return (
        <div>
            <ForumSideNav />
            <ForumMessages messages={messages} />
        </div>
    )
}

export default ForumLabel

