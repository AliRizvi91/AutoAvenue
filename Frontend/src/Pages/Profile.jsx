import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavbarC from '../Components/NavbarC';
import FooterC from "../Components/FooterC.jsx";
import ProfileImage from '../Components/SignupF/ProfileImage'; // Import ProfileImage
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ChatIcon from '@mui/icons-material/Chat';
import '../CSSFiles/PBlock.css';
import '../responsive.css';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [toastShown, setToastShown] = useState(false);

  // Helper function to handle chat click
  const handleChatClick = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  // Ensure that properties are strings before rendering
  const userName = typeof user.name === 'string' ? user.name : 'User';
  const userRole = typeof user.role === 'string' ? user.role : 'Role';
  const userContactNumber = typeof user.contactNumber === 'string' ? user.contactNumber : 'Contact Number';
  const userEmail = typeof user.email === 'string' ? user.email : 'Email';

  return (
    <>
      <NavbarC />
      <div
        className='BGImg'
        style={{
          backgroundImage: `url('/assets/Images/BacImg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '30rem',
          width: '100%',
          backgroundColor: 'green'
        }}
      ></div>

      <div className='container-fluid bg-black d-flex align-items-center detailP' style={{ height: "10rem" }}>
        <div style={{ cursor: 'pointer' }}>
          {user.image ? (
            <ProfileImage
              initialImage={user.image}
              width="8.2rem"
              height="8.2rem"
            />
          ) : (
            <AccountBoxIcon className="Picon" style={{ width: 50, height: 50, color: 'white' }} />
          )}
        </div>
        <div style={{ color: "white", marginLeft: "1rem", background: "black" }}>
          <h2><strong>{userName}</strong></h2>
          <p className='mb-0'>{userRole}</p>
          <div>
            <span style={{ marginRight: "1rem" }}><FacebookIcon /> Facebook</span>
            <span style={{ marginRight: "1rem" }}><LinkedInIcon /> LinkedIn</span>
            <span><TwitterIcon /> Twitter</span>
          </div>
        </div>
      </div>

      <div className='d-flex flex-column my-3 justify-content-center bg-dark' style={{ color: "white", marginLeft: "0rem", fontSize: "0.8rem" }}>
        <div>
          <div className='p-2 m-1 text-center' style={{ borderRadius: "0.7rem", border: "1px solid white", color: "red" }}>
            <div><LocalPhoneIcon style={{ margin: "0.5rem" }} /> +{userContactNumber}</div>
            <div><EmailIcon style={{ margin: "0.5rem" }} />{userEmail}</div>
          </div>

          <div className='p-1 d-flex flex-column justify-content-center align-items-center text-center' style={{ border: "1px solid white", borderRadius: "0.7rem" }}>
            <button type="button" className="btn mx-1 m-1">Update User <ModeEditOutlineIcon /></button>
            <p className='UChatP' style={{ width: "16rem", maxWidth: "100%", fontSize: "0.7rem" }}>Please update your user details by using the buttons provided. This will ensure that your information is current and accurate.</p>
            <button type="button" className="btn mx-1 m-1" style={{ width: "9rem" }} onClick={handleChatClick}>Chat User<ChatIcon /></button>
          </div>
        </div>

        <div className='VBlock d-flex justify-content-center align-items-center'>
          <video
            src="/assets/Videos/AD.mp4"
            autoPlay
            className="object-fit-none rounded PVideo m-2"
            alt="Promotional Video"
            controls
          />
          <img src="/assets/Images/Profilead.jpg" className='m-3' alt="Error" style={{ borderRadius: "1rem" }} />
        </div>
      </div>
      <FooterC />
    </>
  );
};

export default Profile;
