import React, { useState ,useEffect} from 'react'
import { toast } from 'react-toastify';
import "./list.css"
import axios from 'axios'

const List = ({url}) => {

  const [foodList,setFoodList]=useState([])
  

    // fetching list and asign to Foodlist
  const fetchList=async()=>{
     try {
         const res = await axios.get(`${url}api/food/list`)
         console.log(foodList)
         if(res.data.success){
         setFoodList(res.data.data)
         }
         else{
         toast.error("Error")
         }
     } catch (error) {
         toast.error("Server is not running 🚨");
        console.log(error);
     }
  }
  //remove food from list
  const removeFood=async(foodId)=>{
      try {
          const res =await axios.delete(`${url}api/food/remove/${foodId}`)
          await fetchList()
          if(res.data.success){
          toast.success(res.data.message)
      }
      else{
          toast.error("Server Problem")
      }
      } catch (error) {
         toast.error("Error")
      }
  }

  //calling fetch list function
  useEffect(()=>{
    fetchList();

  },[])
 
  return (
    <div className='food-list' >
       <div className="title"><p>All Food List</p></div>
       <div className="-list-table">
          <div className="list-table list-title">
            <p>Image</p>
            <p>Name</p>
            <p>Price</p>
            <p>Category</p>
            <p>Action</p>
          </div>
          
          {foodList.map((item,index)=>
          {
           return(
            <div key={index} className='list-table list-data'>
             <img src={`${url}uploads/`+item.image} alt="" />
             <p>{item.name}</p>
             <p>{item.price}</p>
             <p>{item.category}</p>
             <p onClick={()=>removeFood(item._id)}>X</p>
           </div>
           )
          })}
       </div>
    </div>
  )
}

export default List