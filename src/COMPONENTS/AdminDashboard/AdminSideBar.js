// AdminSideBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import './AdminSideBar.css';

const AdminSideBar = ({ activePage }) => {
    return (
        <div className='adminsidebar'>
            {/* Summary Link */}
            <Link to='/admin/summary' className={`stylenone ${activePage === 'summary' ? 's2' : 's1'}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                    </svg>
                    <span>Summary</span>
                </div>
            </Link>

            {/* Products Dropdown */}
            <Dropdown className={`dropdown-container ${activePage === 'products' ? 's2' : 's1'}`}>
                <Dropdown.Toggle variant="" className={`stylenone ${activePage === 'products' ? 's2' : 's1'}`} id="dropdown-products">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>
                        <span>Products</span>
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/admin/add-product'>Add Product</Dropdown.Item>
                    <Dropdown.Item as={Link} to='/admin/manage-products'>Manage Products</Dropdown.Item>
                    <Dropdown.Item as={Link} to='/admin/add-category'> Add Category</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Customer Reviews Link */}
            <Link to='/admin/reviews' className={`stylenone ${activePage === 'reviews' ? 's2' : 's1'}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    <span>Customer Reviews</span>
                </div>
            </Link>
        </div>
    );
};

export default AdminSideBar;
