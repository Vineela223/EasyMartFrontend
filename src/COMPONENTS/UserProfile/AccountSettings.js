import React,{useEffect,useState} from 'react'
import './AccountSettings.css'
import { useUser } from '../../CONTEXT/UserContext'
import UserServices from '../../SERVICE/UserServices';

const AccountSettings = () => {

    const {user} =useUser();
      // State for form data
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        oldPassword:'',
        newPassword:'',

    });

    const [changePassword, setChangePassword] = useState(false); // State to track password change checkbox

    // Populate form fields with user details when user changes
    useEffect(() => {
        console.log("current user", user);
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                oldPassword: '',
                newPassword: '',
            });
        }
    }, [user]);
     // Handle input changes
     const handleChange = (e) => {
        const { id, value } = e.target; // Destructure id and value from the event target
        setFormData(prevData => ({
            ...prevData,
            [id]: value, // Update the specific field in formData
        }));
    };

      // Handle checkbox toggle for changing password
      const handlePasswordCheckbox = () => {
        setChangePassword(!changePassword);
    };

   // Handle form submission using FormData
   const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with user data
    const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailId: user.emailId,
    };

    // If the user wants to change the password, add the password fields
    if (changePassword) {
        userData.oldPassword = formData.oldPassword;
        userData.newPassword = formData.newPassword;
    }

    // Make a request to update user details
    try {
        const updatedUser = await UserServices.updateUser(user.emailId, userData); // Use the updateUser function
        alert('User details updated successfully!');
        console.log('Updated user details:', updatedUser);
    } catch (error) {
        console.error('Error updating user details:', error);
        alert('An error occurred while updating details');
    }
};
    return (
        <div className='accountsettings'>
            <h1 className='mainhead1'>Personal Information</h1>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='firstName'>First Name <span>*</span></label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='lastName'>Last Name <span>*</span></label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group checkbox-group'>
                    <input
                        type='checkbox'
                        id='changePassword'
                        checked={changePassword}
                        onChange={handlePasswordCheckbox}
                    />
                    <label htmlFor='changePassword'>Change Password</label>
                </div>

                {changePassword && (
                    <div className='password-fields'>
                        <div className='form-group'>
                            <label htmlFor='oldPassword'>Old Password <span>*</span></label>
                            <input
                                type='password'
                                name='oldPassword'
                                id='oldPassword'
                                value={formData.oldPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='newPassword'>New Password <span>*</span></label>
                            <input
                                type='password'
                                name='newPassword'
                                id='newPassword'
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                )}

              
                <button type='submit' className='mainbutton1'>Save Changes</button>
            </form>
        </div>
    )
}

export default AccountSettings
