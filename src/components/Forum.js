import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import ForumMessages from './ForumMessages'
import ForumSideNav from './ForumSideNav'
import '../forum.css'

function Forum() {

    let history = useHistory()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: "/login" } };

    // const auth = useSelector(state => state.auth)
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
            {/* <ForumSideNav />
            <ForumMessages messages={messages} /> */}
            <div className="container bootstrap snippets bootdey">
                <div className="row">
                    <div className="col-md-12 bg-white ">
                        <div className="chat-message">
                            <label className='forumLabel'>Message  </label>
                            <label className='forumLabel2'>Label  </label>
                            <div className="input-group">
                                <input className="form-control border no-shadow no-rounded" placeholder="Type your message here" />
                                <div>        
                                    <select name="label" id="label" className='selectTag center'>
                                        <option className="center" value="general">General</option>
                                        <option className="center" value="browsing_history">Browsing History</option>
                                        <option className="center" value="social_media">Social Media</option>
                                    </select>
                                </div>
                                <span className="input-group-btn">
                                    <button className="btn btn-success no-rounded" type="button">Send</button>
                                </span>
                            </div>
                            <ul className="chat">
                                <li className="left clearfix">
                                    <div className="chat-body clearfix">
                                        <div className="header">
                                            <strong className="primary-font">John Doe</strong>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </li>
                                <li className="right clearfix">
                                    <span className="chat-img pull-right">
                                    </span>
                                    <div className="chat-body clearfix">
                                        <div className="header">
                                            <strong className="primary-font">Sarah</strong>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. 
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    )
}


export default Forum
