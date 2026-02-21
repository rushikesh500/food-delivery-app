import React from 'react'
import "./Footer.css"
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <footer className="footer" id='footer'>
       <div className="footer-content">
           <div className="footer-left">
              <h1>FoodiFY.</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officiis voluptatibus, deleniti vero quos a, alias, similique ullam explicabo molestiae eum fuga.</p>
              <div className="footer-left-icon">
               <img src={assets.facebook_icon} alt="" />
               <img src={assets.twitter_icon} alt="" />
               <img src={assets.linkedin_icon} alt="" />
               </div>
           </div>
           {/**/}
           <div className="footer-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
           </div>
           {/**/}
           <div className="footer-right">
                  <h2>GET IN TOUCH</h2>
                  <p>+21-434323-34</p>
                  <p>foodiyfy@gmail.com</p>
           </div>

       </div>

    </footer>
  )
}

export default Footer