import React, { useState, useEffect } from 'react';
import './CategoryResults.css';
import ProductCard from '../Products/ProductCard';
import CategoryService from '../../SERVICE/CategoryService';
import { useParams } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
import SingleBanner from '../Banners/SingleBanner';
import ProductService from '../../SERVICE/ProductService';
import Pagination from '../Pagination/Pagination'; // Import your pagination component
import ProductFilters from '../Filters/ProductFilters';

const CategoryResults = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [bannerImage, setBannerImage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    useEffect(() => {
        getproductsByCategory();
    }, [categoryName]);

    const getproductsByCategory = async () => {
        try {
            const data = await ProductService.getProductsByCategories(categoryName);
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch product data:", error);
        }
    };

    // Paginate products
    const displayedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="category-results-page">
            <Navbar />
            <SingleBanner
                heading={categoryName}
                bannerimage="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            />

            <div className="filter-sort-container">
                <div className="filters">
                    <h3>Filters</h3>
                    <ProductFilters
                     categoryName={categoryName}
                    />
                </div>

                <div className="products-container">
                    <div className="sort-options">
                        <label>Sort by:</label>
                        <select>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="popularity">Popularity</option>
                        </select>
                    </div>

                    <div className="products-list">
                        {displayedProducts.map(product => (
                            <ProductCard key={product.productId} data={product} />
                        ))}
                    </div>

                    {/* Use your Pagination Component */}
                    <Pagination
                        currentPage={currentPage}
                        totalItems={products.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryResults;
