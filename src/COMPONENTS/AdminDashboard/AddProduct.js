import React, { useState,useEffect } from 'react';
import './AddProduct.css'; // Optional: Add your styles here
import ProductService from '../../SERVICE/ProductService';
import CategoryService from '../../SERVICE/CategoryService';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productCategory: '',
        productBrand: '',
        productSize: '',
        productWeight: '',
        productMaterial: '',
        productQuantity: '',
        productUnit: '',
        productPrice: '',
        salesPrice: '',
        productDiscount: '',
        productTax: '',
        productShippingCharge: '',
        productShippingLocation: '',
        productShippingReturnPolicy: '',
    });

    const [errors, setErrors] = useState({});
    const [images, setImages] = useState([]); // State for multiple images
    const [imagePreviews, setImagePreviews] = useState([]); // State for image previews
    const [categories, setCategories] = useState([]);//get categories

    useEffect(() => {
        // Fetch categories when the component is mounted using ProductService
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await CategoryService.getCategories();
                setCategories(fetchedCategories.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryName = e.target.value;
        setFormData({
            ...formData,
            productCategory: selectedCategoryName,
        });
    };


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to Array
        if (files.length + images.length <= 3) { // Allow up to 3 images total
            const newImages = [...images, ...files];
            setImages(newImages);

            const newImagePreviews = newImages.map((file) => URL.createObjectURL(file));
            setImagePreviews(newImagePreviews);
        } else {
            alert('You can only upload up to 3 images.');
        }
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
        
        setImages(newImages);
        setImagePreviews(newImagePreviews);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.productName) newErrors.productName = 'Product name is required';
        if (!formData.productCategory) newErrors.productCategory = 'Product category is required';
        if (formData.productPrice <= 0) newErrors.productPrice = 'Product price must be greater than 0';
        if (formData.productDiscount <= 0 ) newErrors.productDiscount = 'Product discount must be greater than 0';


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

   

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateForm()) {

            const productData=new FormData();
            // Append product fields to FormData
              // Convert form data to JSON string and append as "productDetails"
              productData.append('productDetails', JSON.stringify(formData));
             // Append images to FormData
            images.forEach((image) => {
                productData.append('productImages', image);
            });

            try {
                  // Use ProductService to create the product
                  const createdProduct = await ProductService.createProduct(productData);
                  console.log('Product created successfully:', createdProduct);
            // Reset form
            setFormData({
                productName: '',
                productDescription: '',
                productCategory: '',
                productBrand: '',
                productSize: '',
                productWeight: '',
                productMaterial: '',
                productQuantity: '',
                productUnit: '',
                productPrice: '',
                salesPrice: '',
                productDiscount: '',
                productTax: '',
                productShippingCharge: '',
                productShippingLocation: '',
                productShippingReturnPolicy: '',
            });

            setImages(null);
            setImagePreviews(null);
        }
        catch(error)
        {
            console.error('Error creating product:', error);
        }
    }
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <div className="form-grid">

            <div className="form-group">
                <label>Product Name:</label>
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                />
                {errors.productName && <span className="error">{errors.productName}</span>}
            </div>

            <div className="form-group">
                <label>Product Description:</label>
                <textarea
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                    <label>Product Category:</label>
                    <select
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                    {errors.productCategory && <span className="error">{errors.productCategory}</span>}
                </div>

            <div className="form-group">
                <label>Product Brand:</label>
                <input
                    type="text"
                    name="productBrand"
                    value={formData.productBrand}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Product Size:</label>
                <input
                    type="text"
                    name="productSize"
                    value={formData.productSize}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Product Weight:</label>
                <input
                    type="text"
                    name="productWeight"
                    value={formData.productWeight}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Product Material:</label>
                <input
                    type="text"
                    name="productMaterial"
                    value={formData.productMaterial}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Product Quantity:</label>
                <input
                    type="number"
                    name="productQuantity"
                    value={formData.productQuantity}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Product Unit:</label>
                <input
                    type="text"
                    name="productUnit"
                    value={formData.productUnit}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Product Price:</label>
                <input
                    type="number"
                    step="0.01"
                    name="productPrice"
                    value={formData.productPrice}
                    onChange={handleChange}
                />
                {errors.productPrice && <span className="error">{errors.productPrice}</span>}
            </div>

            <div className="form-group">
                <label>Sales Price:</label>
                <input
                    type="number"
                    step="0.01"
                    name="salesPrice"
                    value={formData.salesPrice}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Product Discount:</label>
                <input
                    type="number"
                    step="0.01"
                    name="productDiscount"
                    value={formData.productDiscount}
                    onChange={handleChange}
                />
            </div>


            <div className="form-group">
                <label>Product Tax:</label>
                <input
                    type="number"
                    step="0.01"
                    name="productTax"
                    value={formData.productTax}
                    onChange={handleChange}
                />
            </div>


            <div className="form-group">
                <label>Product Shipping Charge:</label>
                <input
                    type="number"
                    step="0.01"
                    name="productShippingCharge"
                    value={formData.productShippingCharge}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Product Shipping Location:</label>
                <input
                    type="text"
                    name="productShippingLocation"
                    value={formData.productShippingLocation}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Product Shipping Return Policy:</label>
                <textarea
                    name="productShippingReturnPolicy"
                    value={formData.productShippingReturnPolicy}
                    onChange={handleChange}
                />
            </div>
            </div>
            <div className="form-group">
                    <label>Product Image (up to 3):</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple // Allow multiple file selection
                    />
                </div>
           {/* Centered Image Previews with SVG for Removal */}
           <div className="image-preview">
    {imagePreviews.length > 0 ? (
        imagePreviews.map((preview, index) => (
            <div key={index} className="image-preview-container">
                <img src={preview} alt={`Preview ${index + 1}`} />
                <div className="delbtn" onClick={() => removeImage(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                </div>
            </div>
        ))
    ) : (
        <p>Product image upload previews will appear here!</p>
    )}
</div>
           <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
