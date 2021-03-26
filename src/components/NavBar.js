import React from 'react'
import {Link} from 'react-router-dom'
import '../style.css'

function NavBar() {
    return (
        <div>
            <nav>
                <div className='logo'><b>Focus</b></div>
                <ul>
                    <li><a href='/' >Home</a></li>
                    <li><a href='/login' >Login/Register</a></li>

                </ul>
            
            </nav>
        </div>
    )
}

export default NavBar
