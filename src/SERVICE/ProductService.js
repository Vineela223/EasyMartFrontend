import axios from "axios";

class ProductService {
  
    static BASE_URL = "http://localhost:8080"


    static async getAllProducts() {
        try {
            const response = await axios.get(`${ProductService.BASE_URL}/api/products`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products', error);
            throw error;
        }
}

// Add createProduct method
static async createProduct(formData) {
    try {
        const response = await axios.post(`${ProductService.BASE_URL}/api/products/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product', error);
        throw error;
    }
}

         // Fetch a product by ID
    static async getProductById(prodid) {
        try {
            const response = await axios.get(`${ProductService.BASE_URL}/api/products/${prodid}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    }


   

   static async getProductsByCategories(categoryName)
   {
    try {
        const response = await axios.get(`${ProductService.BASE_URL}/api/products/category/${categoryName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
   }
}

export default ProductService; 
