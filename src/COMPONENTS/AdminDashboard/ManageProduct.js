import React, { useEffect, useState } from 'react';
import './ManageProducts.css'; // Optional: Add your styles here

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filter, setFilter] = useState({ name: '', minPrice: '', maxPrice: '' });

    // Sample data for demonstration (replace this with API call)
    useEffect(() => {
        // Fetch products from your API and set it to products state
        // Here we are using a sample static array
        const sampleProducts = [
            { id: 1, name: 'Apple', price: 1.2, description: 'Fresh Apples' },
            { id: 2, name: 'Banana', price: 0.8, description: 'Ripe Bananas' },
            { id: 3, name: 'Orange', price: 1.0, description: 'Juicy Oranges' },
        ];
        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts); // Initially show all products
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        let filtered = products;

        if (filter.name) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(filter.name.toLowerCase())
            );
        }

        if (filter.minPrice) {
            filtered = filtered.filter(product => product.price >= filter.minPrice);
        }

        if (filter.maxPrice) {
            filtered = filtered.filter(product => product.price <= filter.maxPrice);
        }

        setFilteredProducts(filtered);
    };

    const handleEdit = (id) => {
        // Navigate to the edit product page
        console.log(`Edit product with id: ${id}`);
        // Example: navigate(`/admin/edit-product/${id}`);
    };

    const handleDelete = (id) => {
        // Delete product logic (e.g., API call to delete the product)
        console.log(`Delete product with id: ${id}`);
        setProducts(products.filter(product => product.id !== id));
        setFilteredProducts(filteredProducts.filter(product => product.id !== id));
    };

    return (
        <div className="manage-products-container">
            <h2>Manage Products</h2>
            <div className="filter-options">
                <input
                    type="text"
                    name="name"
                    placeholder="Filter by Name"
                    value={filter.name}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filter.minPrice}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filter.maxPrice}
                    onChange={handleFilterChange}
                />
                <button onClick={applyFilters}>Apply Filters</button>
            </div>
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className="product-item">
                            <h4>{product.name}</h4>
                            <p>Price: ${product.price}</p>
                            <p>{product.description}</p>
                            <button onClick={() => handleEdit(product.id)}>Edit</button>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ManageProducts;
