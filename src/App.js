import React from 'react'
import{ BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './PAGES/HomePage/Home'
import Login from './PAGES/Auth/LoginUser'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import Signup from './PAGES/Auth/Signup';
import UserProfile from './PAGES/User/UserProfile';
import { UserProvider } from './CONTEXT/UserContext';
import LoginUser from './PAGES/Auth/LoginUser';
import ProductPage from './PAGES/Product/ProductPage';
import AdminDashboard from './PAGES/Admin/AdminDashboard';
import CategoryResults from './COMPONENTS/Category/CategoryResults';
const App = () => {
  return (
    <div>
      <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginUser/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/user/:activepage' element={<UserProfile/>} />
        <Route path='/product/:prodid' element={<ProductPage/>} />
        <Route path='/admin/:activepage' element={<AdminDashboard />} />
        <Route path='/product/category/:categoryName' element={<CategoryResults/>} />
         <Route path='*' element={
          <div>
            <h1>404 NOT FOUND</h1>
          </div>
         }/>
      </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
