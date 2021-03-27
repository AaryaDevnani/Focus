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

    useEffect(() => {
        getMessages()
    }, [])
    
    return (
        <div>
            {/* <ForumSideNav />
            <ForumMessages messages={messages} /> */}
            <div class="container bootstrap snippets bootdey">
                <div class="row">
                    <div class="col-md-12 bg-white ">
                        <div class="chat-message">
                            <ul class="chat">
                                <li class="left clearfix">
                                    <span class="chat-img pull-left">
                                        <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar" />
                                    </span>
                                    <div class="chat-box bg-white">
                            <div class="input-group">
                                <input class="form-control border no-shadow no-rounded" placeholder="Type your message here" />
                                <span class="input-group-btn">
                                    <button class="btn btn-success no-rounded" type="button">Send</button>
                                </span>
                            </div>
                        </div>          
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">John Doe</strong>
                                            <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </li>
                                <li class="right clearfix">
                                    <span class="chat-img pull-right">
                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">Sarah</strong>
                                            <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 13 mins ago</small>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. 
                                        </p>
                                    </div>
                                </li>
                                <li class="left clearfix">
                                    <span class="chat-img pull-left">
                                        <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">John Doe</strong>
                                            <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </li>
                                <li class="right clearfix">
                                    <span class="chat-img pull-right">
                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">Sarah</strong>
                                            <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 13 mins ago</small>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. 
                                        </p>
                                    </div>
                                </li>                    
                                <li class="left clearfix">
                                    <span class="chat-img pull-left">
                                        <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">John Doe</strong>
                                            <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </li>
                                <li class="right clearfix">
                                    <span class="chat-img pull-right">
                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">Sarah</strong>
                                            <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 13 mins ago</small>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. 
                                        </p>
                                    </div>
                                </li>
                                <li class="right clearfix">
                                    <span class="chat-img pull-right">
                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">Sarah</strong>
                                            <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 13 mins ago</small>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. 
                                        </p>
                                    </div>
                                </li>                    
                            </ul>
                        </div>
                        {/* <div class="chat-box bg-white">
                            <div class="input-group">
                                <input class="form-control border no-shadow no-rounded" placeholder="Type your message here" />
                                <span class="input-group-btn">
                                    <button class="btn btn-success no-rounded" type="button">Send</button>
                                </span>
                            </div>
                        </div>             */}
                    </div>        
                </div>
            </div>
        </div>
    )
}

export default Forum
