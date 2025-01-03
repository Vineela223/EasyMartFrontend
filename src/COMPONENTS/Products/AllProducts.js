import React,{useState,useEffect}from 'react'
import './AllProducts.css'
import ProductCard from './ProductCard.js'
import ProductService from '../../SERVICE/ProductService.js'

const AllProducts = () => {
    
    const [products, setProducts] = useState([]);

     // Fetch products when the component mounts
     useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await ProductService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div className='allProducts'>
            <h1>All Products</h1>
            <div className='products'>
                {
                    products.map((item) => {
                        return (
                            <ProductCard data={item} key={item.productId} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default AllProducts
