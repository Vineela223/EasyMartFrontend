
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate to redirect after successful signup
import Navbar from '../../COMPONENTS/NavBar/Navbar';
import './AuthPages.css'
import UserServices from '../../SERVICE/UserServices';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
    const navigate = useNavigate(); // Use for navigation after signup

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
            // Make a POST request to the backend with the form data
            await UserServices.register(formData);
                //alert('Signup successful!');
                navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            // If the error is a 400 status, set the error message
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage("Signup failed. Please try again.");
            }
        }
    };

    return (
        <div className='authpage'>
            <Navbar reloadnavbar={false} />

            <div className='authcont'>
           <img src='https://img.freepik.com/premium-photo/delivery-healthy-food-healthy-vegan-vegetarian-food-paper-bag_1302875-30780.jpg?w=1060'
            alt='signup' />

                <form className='authform' onSubmit={handleSubmit}>
                    <h1>Signup</h1>

                    {/* Show error message if any */}
                    {errorMessage && <p className='error'>{errorMessage}</p>}

                    <div className='form-group-row'>
                        <div className='formgroup'>
                            <label htmlFor='firstName'>First Name</label>
                            <input type='text' id='firstName' value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className='formgroup'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input type='text' id='lastName' value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='formgroup'>
                        <label htmlFor='emailId'>Email</label>
                        <input type='email' id='emailId' value={formData.emailId} onChange={handleChange} required />
                    </div>

                    <div className='form-group-row'>
                        <div className='formgroup'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' value={formData.password} onChange={handleChange} required />
                        </div>
                       
                    </div>

                    <Link to='/login' className='stylenone'>
                        <p>Already have an account?</p>
                    </Link>

                    <button type='submit' className='btn'>Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

