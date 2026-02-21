import React, { useState } from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import Fooddisplay from '../components/Fooddisplay'

const Home = () => {

  let[category,setCategory]=useState("ALL")
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <Fooddisplay category={category} />
    </div>
  )
}

export default Home