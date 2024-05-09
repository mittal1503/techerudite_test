import "./App.css";
import React,{useRef, useState} from 'react'
import {useForm} from 'react-hook-form';
import axiosReq from '../utils/axios';
import {useNavigate} from'react-router-dom';

export default function Login() {
  const{register,handleSubmit,formState:{errors},watch} = useForm();
  const navigate = useNavigate();
  const password = useRef({})
  password.current = watch("password","")

 
  const onSubmit = async(data)=>{
    try{
     const response = await axiosReq.post('/login',data)
     console.log("response",response)

    if(response.data.error_message ) {
      alert(response.data.error_message)
    }
    else if(response.data.err)
    {
       
        alert("something went wrong")
    }
    else{
          navigate('/');
    }
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="form-container">
        <h3 className="form-field"> Admin Login</h3>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
    
          <div className="success-message">
            <div> Please check you Mail for verification and continue.. </div>
          </div>
        
          <input
            className="form-field"
            type="email"
            placeholder="Email"
            name="email"
            {...register("email",{required:true,pattern: /^\S+@\S+$/i})}
          />
        {errors.email && ( <span id="email-error">Please enter an email address</span>   )}

         <input
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            {...register("password",{required:true,pattern:/^[a-zA-Z0-9]{3,30}$/})}
          />
        {errors.password && (   <span id="email-error">password must be filled and valid</span>)}

     
          <button className="form-field" type="submit">
            Login
          </button>
        
      </form>
    </div>
  );
}
