import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from "../assets/assets";
import "./sidebar.css"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="box">
         <div className="subbox">
            <NavLink to="/add" className='links'>
              <img src={assets.add_icon} alt="" />
              <div className="sidebar-hide">
               <span>Add Items</span>
              </div>
            </NavLink>
         </div>
         
        <div className="subbox">
          <NavLink to="/list"  className={({ isActive }) =>isActive ? "links active" : "links"}>
          <img src={assets.order_icon} alt="" />
          <div className="sidebar-hide">
           <span>List</span>
          </div>
          </NavLink>
        </div>

        <div className="subbox">
           <NavLink to="/order" className={({ isActive }) =>isActive ? "links active" : "links"}>
           <img src={assets.order_icon} alt="" />
            <div className="sidebar-hide">
            <span>Orders</span>
            </div>
            </NavLink>
         </div>
      </div>
    </div>
  )
}

export default Sidebar