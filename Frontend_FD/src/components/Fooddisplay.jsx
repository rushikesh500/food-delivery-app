  import "./Fooddisplay.css"
  import { assets} from '../assets/frontend_assets/assets'
  import { useContext} from "react"
  import { StoreContext } from "../context/StoreContext"


  const Fooddisplay = ({category}) => {
    
    const {cartItem,addToCart,removeFromCart,url,food_list,token}=useContext(StoreContext)
  

    return (
    <>
    <h1 className="food-display-title">Top Dishes near you</h1>
    
    <div className="food-display">   
      {food_list.map((item,index)=>{
          if(category==="ALL"|| category===item.category)
          {
            return( 
            <div className="food-card">
          <div className="food-img-box">
              <img src={`${url}uploads/`+item.image} alt="Food Img" />
          </div>
          <div className="food-info">
              <div className="food-name">
                <p>{item.name}</p>
                <img src="rating_starts.png" alt="Rating" />
              </div>

              <div className="food-price_count">
                  <h3>${item.price}</h3>
                    {token? !cartItem[item._id] ? (<div className="food-add">
                                  <img className="add" src={assets.add_icon_white} onClick={()=>addToCart(item._id)} />
                                  </div>) :
                                (<div className="food-count-set" >
                                  <img src={assets.remove_icon_red} onClick={()=>removeFromCart(item._id)}/>
                                  <p>{cartItem[item._id]}</p>
                                  <img src={assets.add_icon_green} onClick={()=>addToCart(item._id)} />
                                  </div>
                                  ):null
                    }
              </div>
              
            </div>
        </div>)
          }
          return null
        })}
      
    </div>

  </>
    )
  }

  export default Fooddisplay