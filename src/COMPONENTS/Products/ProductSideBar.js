import React from 'react'
import AllProducts from './AllProducts'
import CategorySideBar from './CategorySideBar'
import '../Products/ProductSideBar.css'
const ProductSideBar = () => {
  return (
    <div className='productsidebar'>
      <CategorySideBar/>
      <AllProducts/>
    </div>
  )
}

export default ProductSideBar
