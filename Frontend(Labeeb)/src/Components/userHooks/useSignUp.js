
import Axios from 'axios';
import { useState,useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";


function UseSignUp(){
   const [cookie,setCookie] = useCookies(['jwt']);

   const history = useHistory();
    return async function(e){
    try
      {
        e.preventDefault();
        
       const res =await Axios.post('http://localhost:3000/api/v1/users/signup',{
        name :e.target.name.value,
        email :e.target.email.value,
         password :e.target.password.value,
         confirmPassword:e.target.confirmPassword.value
       });
     
       setCookie('jwt',res.data.jwt, { path:'/' , expires : new Date(Date.now()+(1000*60*60*24*7)) }); 
       if(res.data && res.data.jwt && res.data.status === "success") return history.push("/Home");
       
    }catch(err){
      document.getElementById('errMessage').innerHTML = err.response.data.message;
      document.getElementById('errMessage').style.visibility = 'visible';
    }
    }
}
export default UseSignUp;
