import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../CSSFiles/Welcome.css';
import '../responsive.css';
import ProfileImage from '../Components/SignupF/ProfileImage'; // Import ProfileImage
import { userUpdate } from '../redux/thunks/userThunks';
import { toast } from 'react-toastify';

function SelectProfileImg() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Create a reference for the file input

  const [image, setImage] = useState(null);
  const { user } = useSelector((state) => state.user);
  const currentImage = user?.image;
  const id = user?._id;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data to send file
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }

    try {
      const resultAction = await dispatch(userUpdate({ _id: id, data: formData }));
      if (userUpdate.fulfilled.match(resultAction)) {
        toast.success('User profile is updated');
        // Optionally, clear the selected image after successful update
        // setImage(null);
      } else {
        toast.error('User profile update failed');
        throw new Error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast.error('Failed to update user profile');
    }
  };

  // Trigger file input click when profile image is clicked
  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='mainContainer container-fluid'>
      <div className='SPimage smPage p-5 container h-auto w-40 mx-auto my-2 d-flex flex-column align-items-center text-center'>
        <h3><strong>Profile Image</strong></h3>
        <p style={{ fontSize: "0.7rem" }} className='mb-0'>
          A profile image is a visual representation that personalizes and identifies a user on digital platforms.
        </p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div 
            onClick={handleProfileImageClick} 
            style={{ cursor: 'pointer' }}
          >
            {image ? (
              <ProfileImage
                initialImage={URL.createObjectURL(image)} // Use Object URL for the new image preview
                width="12rem" // Set desired width
                height="12rem" //
                style={{ cursor: 'pointer' }}
              />
            ) : currentImage ? (
              <ProfileImage
                initialImage={currentImage}
                width="12rem" // Set desired width
                height="12rem" // Set desired height
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <img
                src='/assets/Images/against.jpg'
                alt="Default Profile"
                style={{ width: "12rem", height: "12rem", borderRadius: "50%", margin: "2rem", cursor: 'pointer' }}
              />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef} // Attach ref to file input
            onChange={handleImageChange}
            className='d-none' // Hide the file input
            accept="image/*"
          />

          {
            image?
            <button
            type="button"
            onClick={handleImageChange}
            className='Wbtn btn btn-primary my-1'
          >Change</button> :
          
          <button
            type="button"
            onClick={handleSubmit}
            className='Wbtn btn btn-primary my-1'
          >Upload</button>
          }
          {/* <button
            type="button"
            onClick={handleImageChange}
            className='Wbtn btn btn-primary my-1'
          >
            {image ? 'Upload' : 'Change'}
          </button> */}
        </div>
      </div>
    </div>
    )
  }
 export default SelectProfileImg