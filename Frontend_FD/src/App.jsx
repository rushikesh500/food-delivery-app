import Navbar from './components/navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import MyOrders from './pages/orders'
import MobileApp from './components/MobileApp'
import {Route, Routes} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext"

const App = () => {
  
 const { token } = useContext(StoreContext);

  return (
    <>
    <div className="app">
      <Navbar/>
      <ToastContainer />

      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/cart" element={<Cart/>}/>
        <Route  path="/order" element={<PlaceOrder/>}/>
        <Route  path="/myorders" element={token ? <MyOrders /> :<Home/>} />
        
      </Routes>
      
      {location.pathname !== "/placeOrder" && location.pathname !== "/myorders" &&  <MobileApp  />}
      
    </div>
     <Footer/>
    </>
  )
}

export default App