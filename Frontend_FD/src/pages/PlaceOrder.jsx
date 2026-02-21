import React from 'react'
import "./PlaceOrder.css"
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { toast } from "react-toastify"


const PlaceOrder = () => {

const {cartItem,food_list,url,token,setCartItem}=useContext(StoreContext)

   // store address
   let [addressData ,setAddressData]=useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      landmark: "",
      phone: ""
   })

   useEffect(() => {
     console.log(addressData)
   }, [addressData])
   
   //making bill
   let subtotal = 0;
   let items = [];

   food_list.forEach(item => {
      if (cartItem[item._id] > 0) {
       subtotal += item.price * cartItem[item._id];
      items.push({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: cartItem[item._id]
       });
      }
   });

  let delivery = subtotal === 0 ? 0 : 2;


   // add data to backend
   const FetchPlaceOrder = async(e)=>{
     e.preventDefault()
     if (!token) {
      toast.error("Login First")
      return
    }

     const orderData ={
      address:addressData,
      items:items,
      amount:subtotal,
      payment:true
     }
   const res = await axios.post(`${url}api/order/place`,orderData,{ headers: { token } })
    
   if(res.data.success){ 
    toast.success("Order Placed Successfully")
    
  }
   else{toast.error("Error placing order")}
   }
   
  return (
    <form onSubmit={FetchPlaceOrder}>
    <div className="place-order">
       <div className="order-left">
          <h2>Delivery Information</h2>
          <div className="address">
                <div className='multi-field'>
                 <input type="text" placeholder='First name' required
                  onChange={(e) => setAddressData({ ...addressData, firstName: e.target.value })} />
                 <input type="text" placeholder='Last name' 
                  onChange={(e) => setAddressData({ ...addressData, lastName: e.target.value })} />
                </div>
                <input type="email" placeholder='Email address'required
                 onChange={(e) => setAddressData({ ...addressData, email: e.target.value })} />
                <input type="text" placeholder='Street'required
                onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}/>
                <div className='multi-field'>
                 <input type="text" placeholder='City'required
                 onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}/>
                 <input type="text" placeholder='State'required
                 onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}/>
                </div>
                <div className='multi-field'>
                 <input type="number" placeholder='Zip code'required
                 onChange={(e) => setAddressData({ ...addressData, zip: e.target.value })}/>
                 <input type="text" placeholder='Land mark'
                 onChange={(e) => setAddressData({ ...addressData, landmark: e.target.value })}/>
                </div>
                <input type="number" placeholder='Phone number'required
                onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}/>
          </div>
       </div>

        <div className="cart-total order-right">
            <h2 className="cart-total-title">Cart Table</h2>
            <div className="cart-total-box">
                <div className="cart-total-details">
                <p>SubTotal</p>
                <p>{subtotal}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                <p>Delivery Charge</p>
                <p>{delivery}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                <p>Total</p>
                <p>{subtotal+delivery}</p>
                </div>
            </div>
            <button disabled={subtotal === 0} type='submit'>PAY Now</button>
      </div>
    </div>
    </form>
  )
}

export default PlaceOrder