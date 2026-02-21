import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import "./add.css"
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {

  
  const [preview, setPreview] = useState(null);
  const [data , setData]=useState({
    name:"",
    category:"salad",
    price:"",
    image:""
  })

  const HandleChangeData  =(e)=>{
      let name =e.target.name;
      let value=e.target.value;
      setData(data=>({...data,[name]:value}))
  }
 
 const HandleSubmit = async (e) => {
  e.preventDefault()
  // adding food
   try {
    //make empty box from data
       const formData =new FormData();
    formData.append("name", data.name)
    formData.append("price", data.price)
    formData.append("category", data.category)
    formData.append("image", data.image)
    //added food using api
     const res = await axios.post(`${url}api/food/add`,formData)
     
     if(res.data.success){
       toast.success("Food added successfully ")
       //emety food form
      setData({
        name: "",
        category: "salad",
        price: "",
        image: ""
      })
      setPreview(null)
     }
     else{
        toast.error("Failed to add food")
     }

   } catch (error) {
        toast.error("Server error")
   }
 }
  return (
    <div className='add'>
      <form className='flex-coln' onSubmit={HandleSubmit} method="post" encType="multipart/form-data">

          <div className="form-group">
            <p>Upload Image</p>
            <label htmlFor="image" ><img src={preview || assets.upload_area} alt="" /></label>
            <input
              id='image'
              name='image'
              type="file"
              accept="image/*"
              hidden
              required
              onChange={(e) => {
                const file = e.target.files[0];
                setPreview(URL.createObjectURL(file));
                setData(prev => ({ ...prev, image: file })); 
              }}

            />
          </div>

          <div className="form-group">
            <p>Product name </p>
            <input
            onChange={HandleChangeData}
            value={data.name}
            className='name' 
            name='name'
            type="text"
            required
            placeholder='Product name' />
          </div>

          <div className="form-group flex-row" >
             <div className="flex-coln2">
              <p>Select Category</p>
              <select name="category" className='category' onChange={HandleChangeData}
            value={data.category} >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              </select>
             </div>

            <div className="flex-coln2">
              <p>Product Price</p>
              <input 
              onChange={HandleChangeData}
              value={data.price}
              className='price'
               name='price'
               type="number"
               required
               placeholder='Product Price' />
            </div>
          </div>

          <button type='submit'>Add</button>

      </form>
    </div>
  )
}

export default Add