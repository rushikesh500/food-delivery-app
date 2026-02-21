import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export let StoreContext =createContext(null)

const StoreContextProvider=(props)=>{

    let [cartItem,setCartItem]=useState({})
    const [food_list,setFood_list]=useState([])
    const url ="https://food-delivery-app-8n36.onrender.com/"

     //setting token
    let[token,setToken]=useState("")
    //add to cart logic
    let addToCart=async(itemId)=>{
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }
        else{
             setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        //update in backend
        if(token){
          await axios.post(`${url}api/cart/addToCart`,{itemId},{headers:{token}})
        }
    }
    // removing item from card
    let removeFromCart=async(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
          await axios.post(`${url}api/cart/removeFromCart`,{itemId},{headers:{token}})
        }
    }
    //loadCartData
    const loadCartData =async(token)=>{
          let res= await axios.post(`${url}api/cart/getCart`,{},{headers:{token}})
           setCartItem(res.data.cartData)
    }

    //aovid deleting token from reload
    useEffect(() => {
      if(localStorage.getItem("token"))
        setToken(localStorage.getItem("token"))
        //adding cart data to frontend
        loadCartData(localStorage.getItem("token")) 
    }, [])

     //fetching food list
  const foodFetch = async()=>{
     try {
          let res = await axios.get(`${url}api/food/list`)
          if(res.data.success){
          setFood_list(res.data.data)
        
    }
    else{
        toast.error("Error")
    }
     } catch (error) {
      toast.error("Error")
     }
   }
  

  //calling foodlist
    useEffect(()=>{
    foodFetch();
  },[])

     

    //useEffect(()=>{
      // console.log(cartItem)
    //},[cartItem])


    const contextValue={
          food_list,
          cartItem,
          setCartItem,
          addToCart,
          removeFromCart,
          url,
          token,
          setToken
    }


    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
