import React from 'react'
import { useSelector } from 'react-redux'

function ForumMessages({messages}) {

    const auth = useSelector(state => state.auth)
    
    return (
        <div>
            {messages.map((message) => (
                <React.Fragment>
                    {
                        message.user_id == auth.user.id 
                        ?
                            <li className="left clearfix">
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font">{message.username}</strong>
                                        <small class="pull-right text-muted">{message.label}</small>
                                    </div>
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </li>
                        : 
                        <li className="right clearfix">
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font">{message.username}</strong>
                                        <small class="pull-right text-muted">{message.label}</small>
                                    </div>
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </li>
                    }
                </React.Fragment>
            ))}
        </div>
    )
}

export default ForumMessages
