import axios from 'axios';

const API_URL = "http://localhost:8080/api/categories"

class CategoryService {

    getCategories() {
        return axios.get(API_URL);
    }

    addCategory(category) {
        return axios.post(`${API_URL}/add` ,category);
    }

    deleteCategory(categoryId) {
        return axios.delete(`${API_URL}/${categoryId}`);
    }
}

export default new CategoryService();
