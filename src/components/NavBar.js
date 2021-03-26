import React from 'react'
import '../style.css'

function NavBar() {
    return (
        <div>
                <nav>
                <h1 class="logo">Focus</h1>
                    <ul>
                        <li><a href='/' className='hoverLine'>Home</a></li>
                        <li><a href='/login' className='hoverLine'  >Login/Register</a></li>
                    </ul>               
                </nav>
        </div>
    )
}

export default NavBar
