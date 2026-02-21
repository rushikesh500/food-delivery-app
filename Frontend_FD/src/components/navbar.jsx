import React, { useState ,useContext} from 'react'
import {StoreContext} from '../context/StoreContext';
import "./navbar.css"
import { assets } from "../assets/frontend_assets/assets";
import Loginpopup from './loginpopup';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();
  
    let [navMenu,setnavMenu]=useState("home")
    let [showLog,setShowLog]=useState(false)
    let {token,setToken,setCartItem,cartItem}=useContext(StoreContext)

    const logout =()=>{
      setToken("")
      setCartItem({})
       localStorage.removeItem("token")
      navigate("/")
    }

  return (

    <>
    {showLog?<Loginpopup setShowLog={setShowLog}/>:<></>}

    <div className="navbar">
        <Link to={"/"}><h1 className="logo-text">Foodi<span>fy</span></h1></Link>

        <div className="navMenu">
            <span onClick={()=>setnavMenu("home")} className={navMenu ==="home"?"active":""}>Home</span>
            <a href="#explore-menu" onClick={()=>setnavMenu("menu")} className={navMenu ==="menu"?"active":""}>Menu</a>
            <a href="#mobile-app" onClick={()=>setnavMenu("mob")} className={navMenu ==="mob"?"active":""}>Mobile app</a>
            <a href="#footer" onClick={()=>setnavMenu("cant")} className={navMenu ==="cant"?"active":""}>Cantact us</a>
            
        </div>
        <div className="navbar_right">
            {// if token is present then show cart
             token?
             <div className="nav_search_icon">
               <Link to={"/cart"}><img src={assets.basket_icon} alt="" /></Link>
               {Object.keys(cartItem).length > 0 && 
               <div className="dot"></div>
               }
             </div>
             :<></>
            }
             
            {//login profile
            !token?<button onClick={()=>setShowLog(true)}>Login</button>
            : <div className='navbar-profile'>
              <img className="profile-icon" src={assets.profile_icon}/>
              <ul className="navbar-profile-dropdown">
                <Link to={"/myorders"}><li>Orders</li></Link>
                 <hr />
                <li className='logout' onClick={logout}>Logout</li>
              </ul>
            </div> 
            }
            
        </div>
        
    </div>

    </>
  )
}

export default Navbar