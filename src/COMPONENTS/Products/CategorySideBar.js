import React,{useState,useEffect} from 'react'
import './CategorySideBar.css'
import CategoryService from '../../SERVICE/CategoryService';
import { useNavigate } from 'react-router-dom';
const CategorySideBar = () => {
   
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); // Hook to navigate


    const fetchCategories = async () => {
        try {
            const response = await CategoryService.getCategories(); // Adjust URL if necessary
            setCategories(response.data);  // Update state with the fetched categories
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleCategoryClick = (category) => {
        navigate(`/product/category/${category}`);  // Navigate to products page with category as parameter
      };
    

    useEffect(() => {
        fetchCategories();
    }, []); 
  return (
    <div className='categorysidebar'>
        {
        categories.length > 0 ? (
                categories.map((item) => {
                    return (
                        <div className='category' key={item.categoryId} onClick={() => handleCategoryClick(item.categoryName)}>
                            <h3>{item.categoryName}</h3>
                        </div>
                    );
                })
            ) : (
                <p>Loading categories...</p> // Display a loading message while fetching data
            )
            }
      
    </div>
  )
}

export default CategorySideBar
