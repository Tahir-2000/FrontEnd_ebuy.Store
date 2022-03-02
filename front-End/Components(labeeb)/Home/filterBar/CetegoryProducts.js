import React,{useEffect,useState} from "react";
import Axios from "axios";
import {useCookies} from "react-cookie";
import CardProductsJSX from "./../cardProductsJSX";
import './../line.css';
import {useLocation} from 'react-router-dom'

function Home(){
  const location = useLocation()
  const[cetegory , setCetegory] = useState('');
   const[products , setProduct] = useState([]);
   
  useEffect(() => {
    const pCetegory =  location.state;
    setCetegory(pCetegory)
    getProducts(pCetegory);
  }, []);

  const getProducts =async (cetegory) => {
    try{
        console.log(cetegory);
    const res =  await Axios.post('http://localhost:3000/api/v1/products/getCetegoryProducts ',{cetegory:cetegory });
      
        setProduct(res.data.product);
        console.log(res.data.product)
      
      
    }catch(err){
      console.log(err.response)
    }
  }

    //product image must have size 500x500 for better adjustment in card
      const items= products.map(item=>{
          return <div className="col-sm-4 col-lg-3 col-6 " >
               <CardProductsJSX id={item._id} url={item.pImagePath} title={item.pTitle} price={item.pPrice}  description={item.pDescription}/>
          </div>
      });



    
    return(
  <div>
      
       {products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Stock ranout...</h2>
                </div> 
                :

                <div>
                  <h1 style={{marginTop:'8%', textAlign:'center'}}>{cetegory}</h1>
                    <div style={{marginTop:'50px' ,paddingRight:'4px',paddingLeft:'5%'}} className="row container-fluid myAllProducts">
                      {items}
                    </div>
                    
                </div>
}
  </div>
    );

}
export default Home;