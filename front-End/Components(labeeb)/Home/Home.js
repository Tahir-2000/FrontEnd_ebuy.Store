import React,{useEffect,useState,useContext} from "react";
import ImageSLiderSmall from "./Sliders/ImageSliderSmaller";
import Axios from "axios";
import {useCookies} from "react-cookie";
import CardProductsJSX from "./cardProductsJSX";
import './line.css';
import './imageSlider.css';
import FilterBar from "./filterBar/FilterBar";
import SaleSlider from "./Sliders/SaleSlider";
import ImageSliderLarge from "./Sliders/ImageSliderLarger";
import { UserContext } from "../userContext/UserContext";
import {useHistory,Link} from 'react-router-dom'

function Home(){
  const history = useHistory();
  const [userLoggedIn] = useContext(UserContext)
  const [cookie] = useCookies(['jwt']);
   const[products , setProduct] = useState([]);
  
  useEffect(() => {
    getProducts();
  }, []);

  const  getProducts= async()=>{
    try{
    const res =  await Axios.post('http://localhost:3000/api/v1/products/getProducts ',{ }, {
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.jwt}`        
      }});
      
        setProduct(res.data.product);
        console.log(res.data.product)
      
      
    }catch(err){
      console.log(err.response)
    }
  }
let count = 0;
    //product image must have size 500x500 for better adjustment in card
      const items= products.map(item=>{
        if(count <= 16){
          count ++;
          return <div className="col-sm-4 col-lg-3 col-6 " >
               <CardProductsJSX  id={item._id} url={item.pImagePath} title={item.pTitle} price={item.pPrice}  description={item.pDescription}/>
          </div>
          }else return;
        
      });

      var hrCount =0;
      const hrLine = products.map(item=>{
        if(item.pOnSale === 'onSale'){ 
          hrCount =hrCount +1;                     
          return ( 
           <div>
            { hrCount === 1?  
            <hr className="hr-text" data-content="Flash Sale" style={{marginBottom:'50px'}}/>
             :
              null}
            
             </div>
           )
        } else{
            return ;
          }  
        
    });

      const itemsSale= products.map(item=>{
        if(item.pOnSale === 'onSale'){                       
          return (  
          <div  className="col-sm-4 col-lg-3 col-6 " >
          <CardProductsJSX  id={item._id} url={item.pImagePath} oldPrice={item.pOldPrice} title={item.pTitle} price={item.pPrice}  description={item.pDescription}/>
          </div>
           )
        } else{
            return ;
          }  
        
    });

    
    return(
     
      
      <>
      {cookie.jwt ?
    
        <div>
        {/* image Sliders */}
        <div className="imageSliderLarge">
           <ImageSliderLarge/>
        </div>
        <div className="imageSliderSmall">
          <ImageSLiderSmall/>
        </div>
    
    {/* Filter bar */} 
    <FilterBar/>
    
     {/* Products cart */}      
           {products.length === 0 ?
                    <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>Loading.....</h2>
                    </div> 
                    :
    
                    <div>
                      <div className="saleSliderLarger" style={{marginBottom:'0px'}} >             
                        <SaleSlider />
                       </div>
                       <div className='saleCardSmall' style={{marginTop:'0px'}}>
                          <div style={{ marginRight:'0px',paddingRight:'3px'}} className="row container-fluid">
                            {hrLine}
                            {itemsSale}
                         </div>
                        </div>
                      <hr style={{marginTop:'0px'}}className="hr-text" data-content="All Products"/>
                        <div style={{marginTop:'50px' ,paddingRight:'4px',paddingLeft:'5%'}} className="row container-fluid myAllProducts">
                          {items}
                        </div>
                       
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <Link className='showMore' to={{pathname:'AllProducts'}} style={{ display: 'flex', justifyContent: 'center',flexDirection:'column' }}>
                                <h5 style={{marginBottom:'0px'}} >Show More</h5>
                                <i style={{fontSize:'50px',paddingLeft:'32%'}}className="fa fa-angle-double-down"></i>
                              </Link>
                          </div>
          

                    </div>
    }
      </div>
      :
      history.push({pathname:'/'})
    }
    </>
    );

}
export default Home;