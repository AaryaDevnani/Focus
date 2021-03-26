import React from 'react'
import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import '../style.css'

function NavBar() {
    const auth = useSelector((state) => state.auth)
    return (
        <div>
            <nav>
                <div className='logo'><b>Focus</b></div>
                <ul>
                    <NavLink to='/' >Home</NavLink>
                    {auth.loggedIn 
                        ? <NavLink to='/logout' >Logout</NavLink>
                        : <React.Fragment>
                            <NavLink to='/login' >Login</NavLink>
                            <NavLink to='/register' >Register</NavLink>
                          </React.Fragment> 
                    }
                    <NavLink to='/forums' >Forums</NavLink>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
