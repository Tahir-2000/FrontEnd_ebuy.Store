
import './ShowMoreCetegories.css';
import '../../line.css';
import { Link } from 'react-router-dom';
function ShowMoreCetegories(){

return(

<div>
     
 <div className='row container-fluid' style={{padding:'auto'}} >
        <div className='col-12 ' style={{ marginTop:'30px' ,display:'flex',justifyContent:'center' }}>
            {/* <h2 style={{display:'inline'  }}>All Cetegories</h2> 
             */}
        </div>
    <hr style={{margin:'50px 0px',fontWeight:'bold',fontSize:'20px', color:'black'}}className="hr-text hr1" data-content="Edible Product Cetegories"/>
   <div className='cetegory row container-fluid' style={{ margin:'0px',marginBottom:'50px',padding:'0px'}} >
    <div className='col-12 col-sm-6 col-lg-6' style={{ marginLeft:'0px',padding:'auto',display:'flex-inline'}}>
    <div className='col-12 filterBarHeading' style={{ padding:'5px 7px',marginTop:'20px' ,display:'flex',justifyContent:'space-between' }}>
                    <h1 style={{display:'inline'  ,marginLeft:'7px',color:'#F57224',marginTop:'0px' }}>Categories</h1> 
                    <Link style={{paddingTop:'4px',textDecoration:'none',color:'red' ,marginRight:'0px',marginTop:'1%'}} to='ShowMore'><h5 >show more
                        <FontAwesomeIcon  style={{color:'rgb(60, 205, 242)',marginLeft:'5px',marginRight:'0px',paddingTop:'3px'}} icon={faAngleDoubleRight}/> </h5></Link>
                </div>
                <div className='row container-fluid cetegoryFilterBar'style={{ padding:'0px',margin:'0px' }}>
                <div className='col-12 col-sm-6 col-lg-6 col-xl-6' style={{ padding:'0px',margin:'0px' ,display:'flex-inline'}}>
            
                <Link to={{ pathname: "/CetegoryProducts", state:'Biscuit,Chocolate'}}>    
                    <div className=' col-2' style={{ marginLeft:'0px',marginRight:'7px',display:'inline-block'}} >
                        <img style={{width:'60px',height:'60px',padding:'0px',margin:'0px',borderRadius:'50%'}} src='' alt='Fan'/>
                        <caption style={{fontSize:'12px',paddingLeft:'0px',margin:'0px'}}>#Fan</caption> 
                    </div> 
                </Link> 
                <Link to={{ pathname: "/CetegoryProducts", state:'Chips'}}> 
                    <div className=' col-2'style={{ marginLeft:'0px',marginRight:'7px',display:'inline-block' }} >
                        <img style={{width:'60px',height:'60px',padding:'0px',borderRadius:'50%'}} src='' alt='oven'/>
                        <caption style={{fontSize:'12px',paddingLeft:'7px',margin:'0px'}}>#oven</caption> 
                    </div>
                </Link> 
                <Link to={{ pathname: "/CetegoryProducts", state:'Cold Drink'}}>       
                    <div className=' col-2'style={{ marginLeft:'0px',marginRight:'7px' ,display:'inline-block'}}>
                        <img style={{width:'60px',height:'60px',padding:'0px',margin:'0px',borderRadius:'50%'}} src='' alt='tv'/> 
                        <caption style={{fontSize:'12px',paddingLeft:'1px',margin:'0px'}}>#tv</caption> 
                    </div>
                    </Link> 
                <Link to={{ pathname: "/CetegoryProducts", state:'Kachup,Souce'}}>       
                    <div className=' col-2' style={{ marginLeft:'0px',marginRight:'7px',display:'inline-block'}} >
                        <img style={{width:'60px',height:'60px',padding:'0px',margin:'0px',borderRadius:'50%'}} src='' alt='grinder'/>
                        <caption style={{fontSize:'12px',paddingLeft:'0px',margin:'0px'}}>#grinder</caption> 
                    </div>
                </Link> 
                </div> 
                
        </div>
    </div> 
    
  </div>
</div>
</div>
    ) 
}
export default ShowMoreCetegories;