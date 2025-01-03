import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductFilters = ({ categoryName,onApplyFilters }) => {
    const [filters, setFilters] = useState({
        brands: [],
        shippingLocation: [],
    });

    const baseURL = "http://localhost:8080";

    const [selectedFilters, setSelectedFilters] = useState({
        brands: [], // Array for multi-selection
        priceRange: [0, 100],
        productDiscount: [0, 100],
        shippingLocation: [], // Array for multi-selection
    });

    useEffect(() => {
        if (categoryName) {
            axios.get(`${baseURL}/api/products/filters/${categoryName}`)
                .then(response => {
                    setFilters(response.data);
                })
                .catch(error => {
                    console.error('Error fetching filters:', error);
                });
        }
    }, [categoryName]);

    const handleCheckboxChange = (filterType, value) => {
        setSelectedFilters(prevState => {
            const currentSelection = prevState[filterType];
            const isSelected = currentSelection.includes(value);

            // Debug log to confirm selection state
            console.log(`Current selection for ${filterType}:`, currentSelection);
            console.log(`Toggling ${value}:`, isSelected ? 'Removing' : 'Adding');

            return {
                ...prevState,
                [filterType]: isSelected
                    ? currentSelection.filter(item => item !== value) // Remove if selected
                    : [...currentSelection, value], // Add if not selected
            };
        });
    };

    const handlePriceChange = (value) => {
        setSelectedFilters(prevState => ({
            ...prevState,
            priceRange: [0, parseInt(value)],
        }));
    };

    const handleDiscountChange = (value) => {
        setSelectedFilters(prevState => ({
            ...prevState,
            productDiscount: [0, parseInt(value)],
        }));
    };

        const applyFilters = () => {
            onApplyFilters(selectedFilters); // Call parent handler with selected filters
        };
        

    return (
        <div>
            {/* Brands */}
            <div>
                <h6>Brands</h6>
                {filters.brands.map((brand, index) => (
                    <div key={`${brand}-${index}`}>
                        <label>
                            <input
                                type="checkbox"
                                value={brand}
                                checked={selectedFilters.brands.includes(brand)}
                                onChange={() => handleCheckboxChange('brands', brand)}
                            />
                            {brand}
                        </label>
                    </div>
                ))}
            </div>

            {/* Price Range */}
            <div>
                <h6>Price Range</h6>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedFilters.priceRange[1]}
                    onChange={e => handlePriceChange(e.target.value)}
                />
                <span>{`$0 - $${selectedFilters.priceRange[1]}`}</span>
            </div>

            {/* Discount Range */}
            <div>
                <h6>Discount Range</h6>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedFilters.productDiscount[1]}
                    onChange={e => handleDiscountChange(e.target.value)}
                />
                <span>{`0% - ${selectedFilters.productDiscount[1]}%`}</span>
            </div>

            {/* Shipping Locations */}
            <div>
                <h6>Shipping Locations</h6>
                {filters.shippingLocation.map((location, index) => (
                    <div key={`${location}-${index}`}>
                        <label>
                            <input
                                type="checkbox"
                                value={location}
                                checked={selectedFilters.shippingLocation.includes(location)}
                                onChange={() => handleCheckboxChange('shippingLocation', location)}
                            />
                            {location}
                        </label>
                    </div>
                ))}
            </div>

            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default ProductFilters;
