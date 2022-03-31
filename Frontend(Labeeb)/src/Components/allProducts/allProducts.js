import React,{useEffect,useState,useContext} from "react";
import Axios from "axios";
import {useCookies} from "react-cookie";
import CardProductsJSX from "../Home/cardProductsJSX";
import { UserContext } from "../userContext/UserContext";
import {useHistory,useLocation,Link} from 'react-router-dom'
import './allProducts.css';
import { CartContext } from "../cartContext/cartContext";

function GetProducts(props){
  const location = useLocation();
  const history = useHistory();
  const [userLoggedIn] = useContext(UserContext)
  const [cookie] = useCookies(['jwt']);
   const[products , setProduct] = useState([]);
   const [Skip, setSkip] = useState(0)
   const [Limit, setLimit] = useState(12)
   const [PostSize, setPostSize] = useState()
   const [SearchTerms, setSearchTerms] = useState("")
   const [cartItem , setCartItem] = useContext(CartContext)
  useEffect(() => {
    const variables = {
        skip: Skip,
        limit: Limit,
        searchTerms :location.state? location.state : SearchTerms
    }
    if(location.state){
      setSearchTerms(location.state)
      console.log(location.state)
    }
    
    getProducts(variables)
  }, [location.state?location.state:null]);

  const  getProducts= async(variables)=>{
    try{
      console.log(variables)
    const res =  await Axios.post('http://localhost:3000/api/v1/products/getProducts ',variables, {
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.jwt}`        
      }});
      
      if (res.data.status === 'success') {
        if (variables.loadMore) {
            setProduct([...products, ...res.data.product])
        } else {
            setProduct(res.data.product)
        }
        setPostSize(res.data.product.length)
    } else {
       console.log('Failed to fetch product data')
    }
      
    }catch(err){
      console.log(err.response)
    }
  }
const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            searchTerms:SearchTerms
        }
        getProducts(variables)
        setSkip(skip)
    }
      const items= products.map(item=>{
       
          return <div className="col-sm-4 col-lg-3 col-6 " >
               <CardProductsJSX  id={item._id} url={item.pImagePath} title={item.pTitle} price={item.pPrice}  description={item.pDescription}/>
          </div>
        
      });

   
    return(
     
      
      <>
      {cookie.jwt ?
    
        <div>
    
           {products.length === 0 ?
                    <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                      <h2>No Product Found.....</h2>   
                    </div> 
                    :
    
                    <div>
                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                       {location.state || SearchTerms?
                        <h2 style={{marginTop:'3%'}}>Search Results</h2>
                        :
                        <h2 style={{marginTop:'3%'}}>All Products</h2>
                       }
                    
                    </div> 
                      
                        <div style={{marginTop:'30px' ,paddingRight:'4px',paddingLeft:'5%'}} className="row container-fluid myAllProducts">
                          {items}
                        </div>
                        
                          {PostSize >= Limit &&
                                                 
                                                   
                          <div   onClick={onLoadMore} style={{ display: 'flex', justifyContent: 'center'}}  >
                               <Link  className='showMore' style={{ display: 'flex', justifyContent: 'center',flexDirection:'column' }}>
                                  <h5 style={{marginBottom:'0px'}} >Load More</h5>
                                  <i style={{fontSize:'50px',paddingLeft:'32%'}}className="fa fa-angle-double-down"></i>
                                </Link>            
                          </div>
                        }
                       
                        
                    </div>
             }
      </div>
      :
      history.push({pathname:'/'})
    }
    </>
    );

}
export default GetProducts;