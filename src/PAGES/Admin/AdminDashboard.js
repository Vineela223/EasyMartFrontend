// AdminDashboard.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../COMPONENTS/NavBar/Navbar';
import SingleBanner from '../../COMPONENTS/Banners/SingleBanner';
import AdminSummary from '../../COMPONENTS/AdminDashboard/AdminSummary';
import CustomerReviews from '../../COMPONENTS/AdminDashboard/CustomerReviews';
import './AdminDashboard.css';
import AdminSideBar from '../../COMPONENTS/AdminDashboard/AdminSideBar';
import BannerSlider from '../../COMPONENTS/Banners/BannerSlider';
import AddProduct from '../../COMPONENTS/AdminDashboard/AddProduct';
import ManageProduct from '../../COMPONENTS/AdminDashboard/ManageProduct';
import AddCategory from '../../COMPONENTS/AdminDashboard/AddCategory';

const AdminDashboard = () => {
    const { activepage } = useParams();

    return (
        <div className='admindashboard'>
            <Navbar />
            <SingleBanner
                heading='Admin Dashboard'
                bannerimage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' 
                />
            <div className='admindashboard-content'>
                <div className='left'>
                    <AdminSideBar activePage={activepage} />
                </div>
                <div className='right'>
                    {activepage === 'summary' && <AdminSummary />}
                    {activepage === 'add-product' && <AddProduct />}
                    {activepage === 'manage-products' && <ManageProduct />}
                    {activepage === 'add-category' && <AddCategory />}
                    {activepage === 'reviews' && <CustomerReviews />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
