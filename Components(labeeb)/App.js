import React  from "react";
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router , Route,Switch } from "react-router-dom";
import ChangePassword from './Components/Admin/changePassword/ChangePassword'
import NavbarAdmin from "./Components/Navbar/NavbarAdmin";
import Sale from "./Components/Sale/Sale";
import Home from "./Components/Home/Home";
import About from "./Components/About/about";
import Signin  from "./Components/Admin/signIn/SignIn";
import Forget  from "./Components/Admin/forgetPassword/ForgetPassword";
import AddProducts  from "./Components/Admin/addProducts/AddProducts";
import ShowProducts from "./Components/Admin/manageProducts/ShowProducts";
import EditProducts from "./Components/Admin/manageProducts/EditProducts";
import ChangeUserName   from "./Components/Admin/changeUserName/ChangeUserName";
import SignUp from "./Components/Admin/signUp/SignUp";
import Cart from "./Components/shoopingCart/Cart";
import ShowMore from './Components/Home/filterBar/utilits/ShowMoreCetegories';
import CetegoryProducts from './Components/Home/filterBar/CetegoryProducts';
import ShippingAddressPage from './Components/shipping/shippingAddress';
import BuyNow from './Components/buyNow/BuyNow';
import {ProviderFunc} from './Components/cartContext/cartContext';
import {UserProviderFunc } from './Components/userContext/UserContext';
import Orders from './Components/Admin/showOrders/ShowOrders';
import UserOrderDetails from './Components/Admin/showOrders/UserOrderDetails';
import PendingOrder from './Components/pendingOrder/PendingOrder.js'
import AllProducts from './Components/allProducts/allProducts';
import MyAccount from './Components/myAccountInfo/MyAccount'


	
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
   
        <Route path = "/shippingPage" exact>
        <NavbarAdmin/>
        <ShippingAddressPage/>
        </Route>
        <Route path = "/BuyNow" exact>
        <NavbarAdmin/>
        <BuyNow/>
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
        <Route path = "/PendingOrder" exact>
          <NavbarAdmin/>
        <PendingOrder/>
        </Route>
        <Route path = "/MyAccount" exact>
          <NavbarAdmin/>
          <MyAccount/>
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
      <Route path = "/about" exact>
      <NavbarAdmin/>
          <About/>
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
        <Route path = "/Orders" exact>
        <NavbarAdmin/>
        <Orders/>
        </Route>
        <Route path = "/userOrderDetails" exact>
        <NavbarAdmin/>
        <UserOrderDetails/>
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
