import React from 'react'
import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import '../style.css'
import { FaBars } from 'react-icons/fa';

function NavBar() {
    const auth = useSelector((state) => state.auth)
    return (
        <div>
            
            <nav>
                <div className='logo'><b>Focus</b></div>
                <label htmlFor='btn' className='fa_icon'>
                    <FaBars/>                
                </label>
                <input type='checkbox' className='checkBox' id='btn' />
                <ul>
                   <li> <NavLink to='/' className='hoverLine' style={navLinkStyle} onMouseEnter={navLinkHover} >Home</NavLink></li>
                    {auth.loggedIn 
                        ? 
                        <React.Fragment>
                            <li><NavLink to='/logout' className='hoverLine' style={navLinkStyle}  >Logout</NavLink></li>
                            <li> <NavLink to='/dashboard' className='hoverLine' style={navLinkStyle} >Dashboard</NavLink></li>
                            <li> <NavLink to='/forums' className='hoverLine' style={navLinkStyle} >Forums</NavLink></li>
                            <li><NavLink to='/restricted' className='hoverLine' style={navLinkStyle} >Restricted </NavLink></li>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            <li> <NavLink to='/login' className='hoverLine' style={navLinkStyle} >Login</NavLink></li>
                            <li> <NavLink to='/register' className='hoverLine' style={navLinkStyle} >Register</NavLink></li>
                        </React.Fragment> 
                    }
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
const navLinkHover={
    color:'cyan',

}

export default NavBar
