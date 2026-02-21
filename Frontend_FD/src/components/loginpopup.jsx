import React, { useState,useContext } from 'react'
import { StoreContext } from "../context/StoreContext";
import "./loginpopup.css"
import { assets } from '../assets/frontend_assets/assets'
import axios from "axios";





const loginpopup = ({setShowLog}) => {

    const {url,token,setToken}=useContext(StoreContext)


    let [currentState ,setCurrentState]=useState("Login")
    // copy Formdata to data
    let [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })
    const HandleChangeData  =(e)=>{
      let name =e.target.name;
      let value=e.target.value;
      setData(data=>({...data,[name]:value}))
  } 
   
  const onLogin=async(e)=>{
      e.preventDefault();
       let newUrl=url
      if(currentState==="Login"){
          newUrl +="api/user/login"
      }
      else{
          newUrl +="api/user/register"
      }
      const res =await axios.post(newUrl,data)

      if(res.data.success){
        setToken(res.data.token)
        localStorage.setItem("token",res.data.token)
        setShowLog(false)
        console.log("Full Response:", res.data)


      }
      else{
        alert(res.data.message)
      }

  
  }
  

  return (
   <>
     <div className="login-popup">
      <form onSubmit={onLogin} className="login-container">
        {/* */ }
        <div className="login-title">
          <h1>{currentState}</h1>
          <img className="login-crossIcon" src={assets.cross_icon} onClick={()=>setShowLog(false)} />
        </div>
         {/* */ }
         <div className="login-input">
            {currentState==="Sign Up"?( <input type="text" name='name' placeholder='Name' required value={data.name}  onChange={HandleChangeData}/>):<></>}
            <input type="text" name='email' placeholder='Email' required value={data.email} onChange={HandleChangeData}/>
            <input type="password" name='password' placeholder='Password' value={data.password} onChange={HandleChangeData} />
         </div>
          {/* */ }
          <button type='submit'>{currentState==="Sign Up"?"Create Account" :"Login"}</button>
           {/* */ }
           {currentState==="Sign Up"?
           (<p >Alredy have a account ?<span onClick={()=>setCurrentState("Login")}> click here</span></p>)
            :(<p>Create a new account ? <span onClick={()=>setCurrentState("Sign Up")}> click here</span></p>)}
           

      </form>

     </div>
   </>
  )
}

export default loginpopup