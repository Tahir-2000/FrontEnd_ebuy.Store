import React,{useContext} from "react";
import  "./cardProducts.css";
import 'bootstrap/dist/css/bootstrap.css';
import { CartContext } from "../cartContext/cartContext";
import {Link} from "react-router-dom";

function CardProducts (props){
    const [cartItem , setCartItem] = useContext(CartContext)
    let id =[] ;
    const addToCartHandler=(pID)=>{
        console.log(pID);
        if(cartItem === {}){//if cart is empty array then set id into it
            setCartItem(pID)
 //NOTE: must initialize cartItem as array so then we can use ...cartItem else if it is object then error of cartItem is not iterable occur
        }else{   
            id= [...cartItem,pID]//hard copying the cart array into id array as first asgument 
            setCartItem(id) // now seting cartItem with id array that have all recent IDs
        } 
    }

    return(       
                <div className="card product_item" >
                    <div className="body" >
                        <div className="cp_img">
                            <img src={props.url} alt="Product" className="img-fluid"/>
                            <div  className="hover ">
                               <div style={{display:'flex',}} className="justify-content-center">
                                <div style={{ display:'inline'}}>
                                    <Link style={{textDecoration:'none'}} onClick={()=>addToCartHandler(props.id)} ><i style={{color:'blue'}} className="zmdi zmdi-plus icon"></i></Link>
                                </div>
                                <div style={{marginLeft:'10px', display:'inline'}}>
                                 <Link style={{textDecoration:'none'}} to={{pathname:'/shippingPage', state:`${props.id}`}} >
                                     <i style={{color:'blue',textDecoration:'none'}} className="zmdi zmdi-shopping-cart icon"></i></Link>
                                </div>
                                </div>
                            </div>
                        </div>
                       
                        {
                            props.oldPrice?//   Old Price is only send by products on sale components call e.g by in saleSlider.js
                                <div className="product_details">
                                    <h6 className="productTitle">{props.title}</h6>
                                    <h7 style={{padding:'0px', marginRight:'0px',color:'blue'}}className="new_price">{props.description}</h7>
                                    <ul style={{padding:'0px', margin:'0px'}}className="product_price list-unstyled">
                                        <li style={{padding:'0px', marginRight:'4px',color:'black', fontSize:'12px'}} className="new_price"><del style={{color:'gray',}}><span style={{color:'red',fontWeight:'bold'}}>Rs.{props.oldPrice}</span></del></li>
                                        <li style={{padding:'0px', margin:'0px',color:'green', fontWeight:'bold'}} className="new_price">Rs.{props.price}</li>
                                    </ul>
                                </div>
                        :
                                <div className="product_details">
                                    <h6 className="productTitle">{props.title}</h6>
                                    <ul style={{padding:'0px', margin:'0px'}}className="product_price list-unstyled">
                                        <li style={{padding:'0px', marginRight:'10px',color:'blue'}}className="new_price">{props.description}</li>
                                        <li style={{padding:'0px', margin:'0px', fontWeight:'bold'}} className="new_price">Rs.{props.price}</li>
                                    </ul>
                                </div>
                            }
                          
                        </div>
                    </div>
                
  
    )
};
export default CardProducts;