import React from 'react'
import "./MobileApp.css"
import { assets } from '../assets/frontend_assets/assets'

const MobileApp = () => {
  return (
    <div className="mobile-app" id='mobile-app'>
        <p>For Better Experience Download FoodiFy App</p>
        <div className="mobile-app-img">
            <img src={assets.play_store}  />
            <img src={assets.app_store}  />
        </div>
    </div>
  )
}

export default MobileApp