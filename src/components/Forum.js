import React, {useState, useEffect} from 'react'
import ForumMessages from './ForumMessages'
import ForumSideNav from './ForumSideNav'

function Forum() {

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
