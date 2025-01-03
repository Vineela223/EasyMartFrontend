import React ,{useState,useEffect} from 'react'
import './UserAddress.css'
import UserServices from '../../SERVICE/UserServices'
import { useUser } from '../../CONTEXT/UserContext'

const UserAddress = () => {
  const[show,setShow]=useState(false)
  const { user } = useUser();  // Get the email from UserContext

  const [savedAddress, setSavedAddress] = useState([]);
  const [addressData, setAddressData] = useState({
    postalCode: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: ''
  });

  useEffect(() => {
    //console.log("email id",user.emailId);
      getSavedAddresses();
  },[]);

  const getSavedAddresses = async () => {

    if (!user.emailId) return; // Avoid fetching if email is not available

    try {
      const addresses = await UserServices.getAddresses(user.emailId);
      //console.log("response address",addresses);
      setSavedAddress(addresses);
      console.log("response saved address ",savedAddress);

    } catch (err) {
      console.error('Failed to fetch addresses', err);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = user.token // Retrieve the token from localStorage
      console.log("token used",token);
      await UserServices.deleteAddress( addressId,token);
      getSavedAddresses(); // Refresh the address list after deleting
    } catch (err) {
      console.error('Failed to delete address', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value
    });
  };

  const handleSaveAddress = async () => {
    try {
      await UserServices.saveAddress(user.emailId, addressData);
      setShow(false);
      getSavedAddresses(); // Refresh the address list after saving
       // Reset form data after saving
       setAddressData({
        postalCode: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: ''
      });
    } catch (err) {
      console.error('Failed to save address', err);
    }
  };

  return (
    <div className='useraddress'>
      {
        !show&&
        <h1 className='mainhead1'>Your Address</h1>
      }
      
      {
          !show &&
          
          <div className='addressin'>
          {
              savedAddress.map((item, index) => {
                  return (
                      <div className='address' key={index}>
                          <span>{item.addressLine1}</span>,
                          <span>{item.addressLine2}</span>,
                          <span>{item.addressLine3}</span>,
                          <span>{item.postalCode}</span>

                        <div className='delbtn' onClick={()=>handleDeleteAddress(item.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                          </div>
                      </div>
                  )
              })
          }
      </div>
      }
      {
        !show &&
        <div className='addnewbtn' onClick={()=> setShow(true)}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
  </div>
      }
      {
        show&&
        <div className='addnew'>
          <h1 className='mainhead1'>Add New Address</h1>
          <div className='form'>
          <div className='form-group'>
            <label htmlFor='postalCode'>Postal Code</label>
            <input
                type='text'
                name='postalCode'
                value={addressData.postalCode}
                onChange={handleInputChange}
              />
          </div>
          <div className='form-group'>
           <label htmlFor='addressline1'>Address Line1</label>
           <input
                type='text'
                name='addressLine1'
                value={addressData.addressLine1}
                onChange={handleInputChange}
              />
          </div>
          <div className='form-group'>
           <label htmlFor='addressline2'>Address Line1</label>
           <input
                type='text'
                name='addressLine2'
                value={addressData.addressLine2}
                onChange={handleInputChange}
              />
          </div>
          <div className='form-group'>
           <label htmlFor='addressline3'>Address Line1</label>
           <input
                type='text'
                name='addressLine3'
                value={addressData.addressLine3}
                onChange={handleInputChange}
              />
          </div>
          </div>
          <button className='mainbutton1' onClick={() => {
    handleSaveAddress();
    setShow(false);
       }}>
  Save
</button>          
</div>
      }
   
      
      
    </div>
  )
}

export default UserAddress
