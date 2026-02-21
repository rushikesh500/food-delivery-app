import React from 'react'
import { assets } from '../assets/frontend_assets/assets';
import "./orders.css"
import { StoreContext } from "../context/StoreContext";
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'

const MyOrders = () => {
    
const {url,token} = useContext(StoreContext)
let [orderData, setOrderData] =useState([])

const fetchOrders =async()=>{
    let res =await axios.post(`${url}api/order/userorders`,{}, { headers: { token } })
     setOrderData(res.data.data)
     console.log(res.data.data)
}   
   useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className='myOrders'>
        <h2 className="orders-title">My Orders</h2>
        {
         orderData.map((order,index)=>{
            return(
                <div className="myOrders-order" key={index}>
                    <img src={assets.parcel_icon} className="order-icon"/>
                    <p className="order-items">{order.items.map((item,index)=>{
                      if(index===order.items.length-1){
                       return item.name+"x"+item.quantity
                      }
                      else{ return item.name+"x"+item.quantity+","}
                     })}
                     </p>
                     <p className="order-amount ">{order.amount}.00</p>
                     <p className="order-count">Items:{order.items.length}</p>
                     <p className='order-status'>{order.status}</p>
                </div> 
            )
         })
        }
       
    </div>
  )
}

export default MyOrders