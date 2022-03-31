import React,{useState,useContext,createContext} from 'react';

export const CartContext = createContext();

export const ProviderFunc = (props)=>{
    const [cartItem , setCartItem] = useState([])
 return(
     <CartContext.Provider value={[cartItem , setCartItem] }>
         {props.children}
     </CartContext.Provider>
 )

}

