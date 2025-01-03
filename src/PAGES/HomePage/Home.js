import React from 'react'
import Navbar from '../../COMPONENTS/NavBar/Navbar'
import BannerSlider from '../../COMPONENTS/Banners/BannerSlider'
import HomeCategories from '../../COMPONENTS/Category/HomeCategories'
import ProductSideBar from '../../COMPONENTS/Products/ProductSideBar'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <BannerSlider/>
        <HomeCategories/>
        <ProductSideBar/>
      <h1>Home</h1>
    </div>
  )
}

export default Home
