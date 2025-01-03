import axios from "axios";

class UserServices{
    static BASE_URL = "http://localhost:8080"

    static async login(emailId, password){
        try{
            const response = await axios.post(`${UserServices.BASE_URL}/api/login`, {emailId, password})
            console.log("from userservice file:",response.data);
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async register(userData){
        try{
            const response = await axios.post(`${UserServices.BASE_URL}/api/signup`, userData)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAddresses(emailId) {
        try {
          const response = await axios.get(`${UserServices.BASE_URL}/api/addresses?emailId=${emailId}`);
          return response.data;
        } catch (err) {
          throw err;
        }
      }

      // Save new address for the user
  static async saveAddress(emailId, addressData) {
    try {
      const response = await axios.post(`${UserServices.BASE_URL}/api/address?emailId=${emailId}`, addressData);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteAddress(addressId,token) {
    try {

        const response = await axios.delete(`${UserServices.BASE_URL}/api/address/${addressId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(userData){
    try{
        const response = await axios.post(`${UserServices.BASE_URL}/api/updateUser`, userData)
        return response.data;
    }catch(err){
        throw err;
    }
}
}

export default UserServices; // <-- Add this line
