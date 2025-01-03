import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../ASSETS/logo.png'
import '../NavBar/Navbar.css'
import { useUser } from '../../CONTEXT/UserContext'

import Dropdown from 'react-bootstrap/Dropdown'
const Navbar = () => {
    const [cartquantity,setcartquantity]=useState(0)
    const { user,logout } = useUser();
    const navigate = useNavigate(); // Hook to navigate

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page
    };
    
  return (
    <nav>
        <div className='s1'>
            <img src={logo} alt='logo' className='logo'/>
            <div className='searchbar'>
                <input type="text" placeholder='Search for products and more categories' className='search'/>
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                </button>
            </div>
            <div className='right'>
                <div className='cart'>
                    <span className='qty'>{cartquantity}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
</div>
<div className='user'>
<Dropdown>
  <Dropdown.Toggle variant="" id="dropdown-basic">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
 {/* Display First Name and Last Name */}
 {user.token && (<span>{user.firstName} {user.lastName}</span>)}
  </Dropdown.Toggle>
  <Dropdown.Menu>
                                {!user.token ? (
                                    // Show "Login" and "Signup" options when not logged in
                                    <>
                                        <Dropdown.Item href="/login">Login</Dropdown.Item>
                                        <Dropdown.Item href="/signup">Signup</Dropdown.Item>
                                    </>
                                ) : (
                                    // Show "User Profile" and "Logout" when logged in
                                    <>
                                        <Dropdown.Item href="/user/accountsettings">User Profile</Dropdown.Item>
                                        <Dropdown.Item as="button" onClick={handleLogout}>
                                            Logout
                                        </Dropdown.Item>
                                    </>
                                )}
                            </Dropdown.Menu>
</Dropdown>

</div>

</div> 
       </div>
        <div className='s2'>
        < a href='/home'>Home</a>
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">categories</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="/products/category/">Fresh Vegetables</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Fresh Fruits</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Produces</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Beverages & Bakery</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <a> About Us</a>
        <a> Contact Us</a>
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">More</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">FAQs</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Privacy Policy</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Terms & Conditions</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        </div>

    </nav>
  )
}

export default Navbar
