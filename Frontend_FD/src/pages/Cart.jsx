import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import "./cart.css"
import { Link } from 'react-router-dom'

const Cart = () => {
     
   const {cartItem,food_list,removeFromCart,url}=useContext(StoreContext)

   // subtotal logic
   let subtotal=0;
   let delivery=2;
   for(let item of food_list){
     if(cartItem[item._id]>=1){
          subtotal=subtotal+item.price*cartItem[item._id]
     }
   }
   
    
  
  return (
    <div className="cart">
       
       <div className="cart-item">
            <div className="cart-items-title">
              <p>Item</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
              <br />
              <hr />
            {food_list.map((item,index)=>{
                if(cartItem[item._id]>0){
                  return(
                    
                  <div>
                   <div className="cart-items-item cart-items-title">
                    <img src={`${url}uploads/`+
                    item.image} alt="" />
                     <p>{item.name}</p>
                     <p>${item.price}</p>
                     <p>{cartItem[item._id]}</p>
                     <p>${(cartItem[item._id]*item.price)}</p>
                     <p className='cross' onClick={()=>removeFromCart(item._id)} >X</p>
                   </div>
                     <hr />  
                  </div>               
                  )
                }
            })}
             
       </div>
     
     
     <div className="cart-bottom">

      

      <div className="cart-total">
            <h2 className="cart-total-title">Cart Table</h2>
            <div className="cart-total-box">
                <div className="cart-total-details">
                <p>SubTotal</p>
                <p>{subtotal}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                <p>Delivery Charge</p>
                <p>{subtotal===0?delivery=0:delivery=2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                <p>Total</p>
                <p>{subtotal+delivery}</p>
                </div>
            </div>
            <Link to={"/order"}><button disabled={subtotal === 0}> PROCEED TO CHECKOUT</button></Link>
      </div>

      <div className="promocode">
        <p>If you have promo code,Enter it here</p>
        <div className="promocode-input">
          <input type="text" placeholder='promo code' />
          <button>Submit</button>
        </div>
      </div>

     </div>



    </div>
  )
}

export default Cart