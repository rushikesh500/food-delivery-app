import React from 'react'
import { assets } from "../assets/assets";
import "./navbar.css"


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navleft">
        <h1 className="logo-text">Foodi<span>fy</span></h1>
         <p>Admin Panel</p>
      </div>
      <div className="navright">
         <img src={assets.profile_image} alt="" />
      </div>
    </div>
  )
}

export default Navbar