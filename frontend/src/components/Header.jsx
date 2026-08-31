import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/students">Home</Link></li>
        </ul>
    </div>
  )
}

export default Header