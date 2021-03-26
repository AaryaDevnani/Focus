import React from 'react'

function ForumMessages({messages}) {
    return (
        <div>
            {messages.map((message) => (
                <React.Fragment key={message.id}>
                    <p className="center">{message.message}</p>
                    <p className="center"> By {message.username}</p>
                </React.Fragment>
            ))}
        </div>
    )
}

export default ForumMessages
