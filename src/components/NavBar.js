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
                    <NavLink to='/' className='hoverLine' >Home</NavLink>
                    {auth.loggedIn 
                        ? <NavLink to='/logout' className='hoverLine' >Logout</NavLink>
                        : <React.Fragment>
                            <NavLink to='/login' className='hoverLine' >Login</NavLink>
                            <NavLink to='/register' className='hoverLine' >Register</NavLink>
                          </React.Fragment> 
                    }
                    <NavLink to='/forums' className='hoverLine' >Forums</NavLink>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
