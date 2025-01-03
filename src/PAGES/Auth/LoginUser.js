import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../COMPONENTS/NavBar/Navbar';
import UserServices from '../../SERVICE/UserServices';
import './AuthPages.css';
import { useUser } from '../../CONTEXT/UserContext';
const LoginUser = () => {

    const [formData, setFormData] = useState({
        emailId: '',
        password: ''
    });

    const {login} =useUser();

    const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
    const navigate = useNavigate(); // For navigation after successful login

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
      
          try {
              const userData = await UserServices.login(formData.emailId, formData.password)
              console.log("from login page:",userData)
              if (userData.token) {

                login({
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  token: userData.token,
                  emailId:userData.emailId,
                  role: userData.role,
              });
                  localStorage.setItem('token', userData.token)
                  localStorage.setItem('role', userData.role)
                   // Check if the user is an admin
                if (userData.role === 'ADMIN') {
                    navigate('/admin/summary'); // Admin dashboard
                } else {
                    navigate('/home'); // Redirect to user home page
                }
            } else {
                setErrorMessage(userData.message);
            }
          } 
      catch (error) {
            // Handle error
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data); // Set error message from the backend
            } else {
                setErrorMessage('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className='authpage'>
            <Navbar reloadnavbar={false} />

            <div className='authcont'>
                <img
                    src='https://img.freepik.com/premium-photo/delivery-healthy-food-healthy-vegan-vegetarian-food-paper-bag_1302875-30780.jpg?w=1060'
                    alt='login'
                />

                <form className='authform' onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    {/* Show error message if any */}
                    {errorMessage && <p className='error'>{errorMessage}</p>}

                    <div className='formgroup'>
                        <label htmlFor='emailId'>Email</label>
                        <input
                            type='email'
                            id='emailId'
                            value={formData.emailId}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='formgroup'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Link to='/forgotpassword' className='stylenone'>
                        <p>Forgot Password?</p>
                    </Link>
                     
                     
                    <button type='submit' className='btn'>Login</button>

                    <h2 className='or'>OR</h2>

                    <Link to='/signup' className='stylenone'>
                        <button className='btn'>Signup</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginUser;
