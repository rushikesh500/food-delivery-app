import { toast } from 'react-toastify';
import axios from 'axios'
import { useState,useEffect } from 'react'
import { assets } from '../../assets/assets';
import './order.css'

const Order = ({url}) => {

  let [orderList , serOrederList]=useState([])

  const FetchOrderList = async()=>{
       try {
         const res =await axios.get(`${url}api/order/list`)
         serOrederList(res.data.data)
       } catch (error) {
          console.log(error)
          toast.error("Error in Backend")
       }
  }

  const statusHandler =async(event,orderId)=>{
      const res = await axios.post(`${url}api/order/status`,{
         orderId,
         status:event.target.value
      })
      if(res.data.success)
      {
         await FetchOrderList()
         toast.success("Status updated")
      }
      else{
         toast.error("Error to update")
      }
  }

  useEffect(()=>{
     FetchOrderList()
  },[])
  

  return (
     <div className='myOrders'>
            <h2 className="orders-title">Order Page</h2>
            
            {
             orderList.map((order,index)=>{
               return(
                <div className='flex-coln' key={index}>
                  <div className="myOrders-order" >
                        <img src={assets.parcel_icon} className="order-icon"/>
                        <p className="order-items">{order.items.map((item,index)=>{
                          if(index===order.items.length-1){
                           return item.name+"x"+item.quantity
                          }
                          else{ return item.name+"x"+item.quantity+" | "}
                         })}
                         </p>
                         <p className="order-amount ">{order.amount}.00</p>
                         <p className="order-count">Items:{order.items.length}</p>
                         <p className='order-status'>
                            <select className="status-select" onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                             <option value="processing">Food Processing</option>
                             <option value="out For Delivery">Out for Delivery</option>
                             <option value="delivered">Delivered</option>
                            </select>
                         </p>
                    </div> 

                    <div className='address'>
                       <p>{order.address.firstName+" "+order.address.lastName}</p>
                       <p>{order.address.street},</p>
                       <p>
                        <span>{order.address.city},</span>
                        <span>{order.address.state},</span>
                        <span>{order.address.zip}</span>
                       </p>
                       <p>{order.address.phone}</p>
                    </div>


                </div>
              )
             })
            }
           
        </div>
  )
}

export default Order