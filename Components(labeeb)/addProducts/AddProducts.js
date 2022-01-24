import React,{useContext} from 'react';
import "./../SignIn.css";
import { useHistory } from 'react-router';
import useAddProductFunc from './AddProductFunc';
import { app }  from './../../firebase/firebaseConfig';
import { useState } from 'react';
import { UserContext } from '../../userContext/UserContext';

function AddProducts (){
	const history = useHistory();
	const [oldPriceDisable, setOldPriceDisable] = useState(true)
	const [userLoggedIn,setUserLoggedIn] = useContext(UserContext)
	const [image, setImage]= useState(null);
	const [sale, setSale]= useState(' ');
	const [edible, setEdible]= useState(' ');
	const [URL, setURL] = useState(' ');
	const [cetegoryValue, setCetegoryValue] = useState(1)
	const edibleCetegories = [
		{ key: 1, value: "Chips" },
		{ key: 2, value: "Chocolate" },
		{ key: 3, value: "Biscuit" },
		{ key: 4, value: "Juice" },
		{ key: 5, value: "Cold Drink" },
		{ key: 6, value: "Cooking Ghee" },
		{ key: 7, value: "Cooking Oil" },
		{ key: 8, value: "Recipe Masalah" },
		{ key: 9, value: "Spice" },
		{ key: 10, value: "Herb" },
		{ key: 11, value: "Grain" },
		{ key: 12, value: "Souce" },
		{ key: 13, value: "Kachup" },
		{ key: 14, value: "Rice" },
	
	]
	const nonEdibleCetegories =[
		{ key: 1, value: "Stationary" },
		{ key: 2, value: "Beuty & Beuty" },
		{ key: 3, value: "Perfume" },
		{ key: 4, value: "Soap" },
		{ key: 5, value: "Detergent" },
		{ key: 6, value: "Surface Cleaner" },
		{ key: 7, value: "Bathroom Cleaner" },
		{ key: 8, value: "Tissue" },
		{ key: 9, value: "Insect Killer" },
		{ key: 10, value: "Electronic" },
		{ key: 11, value: "Face Mask" },
		{ key: 12, value: "Baby Pamper" },
		{ key: 13, value: "Adult Pamper" }
	]
	const useAddProductFuncCall = useAddProductFunc();

	const onCetegoryChange = (event) => {
        setCetegoryValue(event.currentTarget.value)
    }
    
	const saleChangeLisner =()=>{
	if(sale === ' '){
		setSale('onSale');
		setOldPriceDisable(false)
		
	}else{
		setSale(' ');
		setOldPriceDisable(true)
	
	}

	}
	const edibleChangeLisner =()=>{
	if(edible === ' '){
		setEdible('edible');
	}else{
		setEdible(' ');
	}
}
	const handleChange = (e) => {

		 if (e.target.files[0]) {
		 const newImage = e.target.files[0];
		  setImage(newImage)
		  console.log(newImage);
		}else{
			console.log('no image');
		}
	  }

	 const  handleUpload = async () => {
	
		const storageRef = app.storage().ref('/images');
		const fileRef = storageRef.child(image.name);
		await fileRef.put(image);
		setURL(await fileRef.getDownloadURL());
		console.log(URL);
		 console.log(image.name);
	  console.log(image);
		
	 }

    return(
		<>
     
        {userLoggedIn.length !== 0 ?
				<>
			
				{userLoggedIn.role === 'admin'?
				<div className="text-center" style={{padding:'50px' }}>

			<div className="logo" style={{color:'#F57224'}}>Add Products</div>
			<div className="login-form-1">
				<form id="register-form" className="text-left"  onSubmit={useAddProductFuncCall}>
					<div className="login-form-main-message"></div>
					<div className="main-login-form">
						<div className="login-group">
							<div className="form-group">
								<input type="text" className="form-control"  name="pTitle" placeholder="Product Name" required='true'/>
							</div>

							<div className="form-group">
								<div className=" row" style={{display:'flex',paddingLeft:'13px', paddingRight:'10px'}}	>
									<input style={{width:'50%',display:'inline'}} type="number" className="form-control col-6"  name="pPrice" placeholder="Price" required='true'/>
									<input style={{width:'50%',display:'inline'}} disabled={oldPriceDisable} type="number" className="form-control col-6"  name="pOldPrice" placeholder="Old Price" />
								</div>
							</div>
							<div className="form-group">
								<input type="text" className="form-control"  name="pDescription" placeholder="Product Decription" required='true'/>
							</div>
							
							<div className="form-group">
								<input type="text" className="form-control" id="pCount" name="pStock" placeholder="Number of Products" required='true'/>
							</div>

							<div className="form-group-select" >
							
								<select className="form-select form-select-sm  " style={{color:'#6e6e6e ',fontWeight: 'bold',
								fontSize: '20px',padding: 'none ',marginBottom:'3px !important',marginTop:'7px !important' , overflow:'scroll'}}
								name="pCetegory" onChange={onCetegoryChange} value={cetegoryValue}>
								
								{edible === 'edible'?
									edibleCetegories.map(item => (
										<option style={{overflow:'scroll !important'}}key={item.key} value={item.value}>{item.value} </option>
									))
								:
									nonEdibleCetegories.map(item => (
										<option style={{overflow:'scroll !important'}}key={item.key} value={item.value}>{item.value} </option>
									))
								}

								</select>
							</div>

							<div style={{paddingTop:'9px',paddingBottom:'0px'}}className="form-group login-group-checkbox "  >                 
							
								<input type="checkbox" className="" name="pEdible"  onChange={edibleChangeLisner} id='Edible' value={edible} />
								<label for="Edible" >Edible </label>
							
								<input  type="checkbox" className="" name="pOnSale" onChange={saleChangeLisner} id="Sale"  value={sale}/>
								<label for="Sale">On Sale</label>
						
							</div>
							
							<div className=" rounded form-group  ">
							<input  style={{marginBottom:'8px'}} onChange={handleChange} className="pic" type="file" required='true'/>
							</div>
							
							{image?
							<div  className="form-group" >
							<input style={{marginTop:'8px',padding:'2px', width:'110%'}} type="button" className="btn btn-outline-primary btn-lg"  onClick={handleUpload}  value='Click here to upload the image'/>
							<input style={{display:'none'}} role='button'   name="pURL" value={URL} required='true'/>
							</div>
							:
							null
							}
							<div >
								<p id='errMessage' style={{visibility:'hidden',color:'red',paddingTop:'10px'}}>empty</p>
							</div>
						</div>
						<button type="submit" onSubmit={useAddProductFuncCall} className="login-button"><i className="fa fa-chevron-right"></i></button>
					</div>
					
				</form>
			</div>
			<div style={{marginTop:'10px' , width:'100%', maxHeight:'240px'}}>
			<img style={{marginTop:'10px' , maxWidth:'250px', maxHeight:'240px' ,borderRadius:'50%'}}src={URL}/>
			</div>
			</div>
			:
			history.push({pathname:'/Home'})
			}
			</>
	:
	<div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
	<h2>Loading.....</h2>
 </div> 
			}
	</>
    );

}
export default AddProducts;
