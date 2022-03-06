import React  from "react";
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router , Route,Switch } from "react-router-dom";
import ChangePassword from './Components(labeeb)/changePassword/ChangePassword'
import NavbarAdmin from "./Components(labeeb)/Navbar/NavbarAdmin";
import Sale from "./Components(labeeb)/Sale/Sale";
import Home from "./Components(labeeb)/Home/Home";
import Signin  from "./Components(labeeb)/signIn/SignIn";
import Forget  from "./Components/Admin/forgetPassword/ForgetPassword";
import AddProducts  from "./Components(labeeb)/addProducts/AddProducts";
import ShowProducts from "./Components(labeeb)/manageProducts/ShowProducts";
import EditProducts from "./Components(labeeb)/manageProducts/EditProducts";
import ChangeUserName   from "./Components(labeeb)/changeUserName/ChangeUserName";
import SignUp from "./Components(labeeb)/signUp/SignUp";
import Cart from "./Components(labeeb)/shoopingCart/Cart";
import ShowMore from './Components(labeeb)/Home/filterBar/utilits/ShowMoreCetegories';
import CetegoryProducts from './Components(labeeb)/Home/filterBar/CetegoryProducts';
import {ProviderFunc} from './Components/cartContext/cartContext';
import {UserProviderFunc } from './Components/userContext/UserContext';
import AllProducts from './Components(labeeb)/allProducts/allProducts';


function App() {

  return (
    <div className = "App">
<UserProviderFunc>    
<ProviderFunc>    
   <Router>
     
    <Switch>   
      <div className='outer'>

    <Route path = "/" exact>
        <Signin/>
      </Route>

      <Route path = "/signUp" exact>
        <SignUp/>
      </Route>

      <Route path = "/Allproducts" exact>
      <NavbarAdmin/>
        <AllProducts/>
      </Route>
      <Route path = "/forgetPassword" exact>
        <Forget/>
      </Route>
      <Route path = "/Cart" exact>
      <NavbarAdmin/>
        <Cart/>
        </Route>

        <Route path = "/ChangeUserName" exact>
        <NavbarAdmin/>
        <ChangeUserName/>
      </Route>
      <Route path = "/ShowMore" exact>
      <NavbarAdmin/>
        <ShowMore/>
      </Route>
      <Route path = "/Home" exact>
      <NavbarAdmin/>
        <Home/>
      </Route>
      <Route path = "/Sale" exact>
      <NavbarAdmin/>
        <Sale/>
      </Route>

      {/* routing component with sending data as props in it from <Link/> */}
      <Route path="/CetegoryProducts"  >
      <NavbarAdmin/>
      <CetegoryProducts />
      </Route>
     
      </div> 
      </Switch>
      <Switch>
      <Route path = "/ChangePassword/:resetToken" >
        <ChangePassword/>
      </Route>
       
      <Route path = "/ShowProducts" exact>
      <NavbarAdmin/>
        <ShowProducts/>
      </Route>
      <Route path = "/EditProducts" exact>
      <NavbarAdmin/>
        <EditProducts/>
      </Route>
      <Route path = "/addProducts" exact>
      <NavbarAdmin/>
          <AddProducts/>
      </Route>
     
</Switch>
    
      </Router>
</ProviderFunc>  
</UserProviderFunc> 
    </div>
  );
}

export default App;
