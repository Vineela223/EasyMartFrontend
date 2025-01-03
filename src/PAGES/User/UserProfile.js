import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../COMPONENTS/NavBar/Navbar'
import SingleBanner from '../../COMPONENTS/Banners/SingleBanner'
import AccountSettings from '../../COMPONENTS/UserProfile/AccountSettings'
import ChangePassword from '../../COMPONENTS/UserProfile/ChangePassword'
import YourOrders from '../../COMPONENTS/UserProfile/YourOrders'
import UserAddress from '../../COMPONENTS/UserProfile/UserAddress'
import './UserProfile.css'
import UserSideBar from '../../COMPONENTS/UserProfile/UserSideBar'
const UserProfile = () => {

    const {activepage} =useParams()


  return (
    <div className='userprofile'>
        <Navbar/>
        <SingleBanner
        heading={'My Profile'}
        bannerimage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' 
        />
       {/* UserProfile , showing {activepage} */}
       <div className='userprofilein'>
            <div className='left'>
              <UserSideBar activepage={activepage}/>
            </div>
            <div className='right'>
              {activepage === 'accountsettings' && <AccountSettings/>}
              {activepage === 'changepassword' && <ChangePassword/>}
              {activepage === 'yourorders' && <YourOrders/>}
              {activepage === 'address' && <UserAddress/>}
            </div>
         </div>     
    </div>
  )
}

export default UserProfile
