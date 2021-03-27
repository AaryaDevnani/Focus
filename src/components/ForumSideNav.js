import React from 'react'
import {Link} from 'react-router-dom';

function ForumSideNav() {
    return (
        <div>
            <ul>
                <li><Link to="/forums">All</Link></li>
                <li><Link to="/forum/general">General</Link></li>
                <li><Link to="/forum/browsing_history">Browsing History</Link></li>
                <li><Link to="/forum/social_media">Social Media</Link></li>
            </ul>
        </div>
    )
}

export default ForumSideNav
