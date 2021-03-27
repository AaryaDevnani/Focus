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
                    <NavLink to='/' className='hoverLine' style={navLinkStyle} >Home</NavLink>
                    {auth.loggedIn 
                        ? <NavLink to='/logout' className='hoverLine' style={navLinkStyle} >Logout</NavLink>
                        : <React.Fragment>
                            <NavLink to='/login' className='hoverLine' style={navLinkStyle} >Login</NavLink>
                            <NavLink to='/register' className='hoverLine' style={navLinkStyle} >Register</NavLink>
                          </React.Fragment> 
                    }
                    <NavLink to='/forums' className='hoverLine' style={navLinkStyle} >Forums</NavLink>
                </ul>
            </nav>
        </div>
    )
}
const navLinkStyle={
  color: 'white',
  textDecoration: 'none',
  lineHeight:'70px',
  fontSize: '18px',
  padding:'8px 15px',
}

export default NavBar
