import React from 'react';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import { useDispatch ,useSelector} from 'react-redux';
import { logout as logoutAction } from '../redux/slices/userSlice';

import '../index.css';
import '../CSSFiles/PBlock.css';

// icons
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const PGroup = (props) => {
    const {user} = useSelector((state)=> state.user)
    const {PImage, Email, Name } = props;
    const dispatch = useDispatch();

    const handleWelcomeClick = () => {
        window.location.href = '/welcome'; // Example path
    };

    const handlePostClick = () => {
        window.location.href = '/post'; // Example path
    };
    const handleProfileClick = () => {
        window.location.href = '/profile'; // Example path
    };
    const handleProfileChange = () => {
        window.location.href = `/profileimg/${user?._id}`; // Example path
    };

    const handleLogoutClick = () => {
        dispatch(logoutAction()); // Dispatch the logout action
    };

    return (
        <>
            <div className='container p-2 mx-4 text-center d-flex flex-column justify-content-center align-items-center bg-dark rounded shadow'>
                <p style={{ fontSize: "0.8rem" }}>{Email}</p>
                {/* Profile with Icon */}
                <div className="profile-container" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    {PImage ? (
                        <Image src={PImage} className="profile-img" style={{ borderRadius: "50%", width: 60, height: 60, marginRight: 10 }} />
                    ) : (
                        <Link to="#"><AccountBoxIcon className="Picon" style={{ width: 50, height: 50, color: 'white', marginRight: 10 }} /></Link>
                    )}
                    <img src='/assets/Images/Pen.png' alt="Edit Icon" onClick={handleProfileChange} style={{ width: 30, height: 30, position: "absolute", top: "64%", right: "0", transform: "translateY(-50%)", borderRadius: "50%", cursor: 'pointer' }} />
                </div>
                <h6><strong>Assalam-O-Alaikum <br /> {Name}</strong></h6>

                {/* Welcome */}
                <button type="button" onClick={handleWelcomeClick} className="btn mx-1 mt-0">Welcome</button>
                <p style={{ width: "16rem", maxWidth: "100%", fontSize: "0.6rem" }}>
                    Thank you so much for watching! We hope the 'Welcome' button makes signing up and signing in easy for you.
                </p>
                
                {/* Proile */}
                <button type="button" onClick={handleProfileClick}  className="btn mx-1 mt-0">Profile</button>

                {/* Post */}
                <button type="button" onClick={handlePostClick} className="btn mx-1 mt-0">Post</button>
                <button type="button" onClick={handleLogoutClick} className="btn mx-1 mt-0">LogOut</button>
            </div>
        </>
    );
};

export default PGroup;
