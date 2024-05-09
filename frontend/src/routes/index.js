import React from 'react'
import Register from '../pages/register'
import AdminRegister from '../pages/adminRegister';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { MailVerify } from '../pages/mailVerify';
import Login from '../pages/login';
import { Home } from '../pages/home';
export const Routers = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/customer-registeration' element={<Register/>}/>
      <Route path='/admin-registeration' element={<AdminRegister/>}/>
      <Route path='/email-verify' element={<MailVerify/>}/>
      <Route path='/login' element={<Login/>}/>
      adminRegister
    </Routes>
    </BrowserRouter>
  )
}
