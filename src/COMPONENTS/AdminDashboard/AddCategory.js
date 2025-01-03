import React, { useEffect, useState } from 'react';
import CategoryService from '../../SERVICE/CategoryService';
import './AddCategory.css'

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async () => {
        if (newCategoryName.trim() === '') return alert('Category name cannot be empty');

        const newCategory = { categoryName: newCategoryName };

        try {
            await CategoryService.addCategory(newCategory);
            setNewCategoryName('');
            fetchCategories(); // Refresh category list
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await CategoryService.deleteCategory(categoryId);
            fetchCategories(); // Refresh category list
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div>
            <h2>Category Management</h2>
            <div className="category-form">
                <input
                    type="text"
                    placeholder="New Category Name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add Category</button>
                </div>
                <div className='result-container'>
            <ul>
                {categories.map((category) => (
                    <li key={category.categoryId}>
                        {category.categoryName}
                        <button onClick={() => handleDeleteCategory(category.categoryId)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default AddCategory;
