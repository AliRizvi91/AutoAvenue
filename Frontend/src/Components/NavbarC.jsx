import React, { useState, useEffect, useCallback } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PGroup from '../Components/PGroup';
import { logout } from '../redux/slices/userSlice';
import '../index.css';
import '../App.css';
import '../responsive.css';
import axios from 'axios';
import ProfileImage from './SignupF/ProfileImage'; // Import ProfileImage

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavbarC = () => {
  const [categories, setCategories] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Toggle profile visibility
  const handleProfileClick = useCallback(() => {
    setShowProfile(prevShowProfile => !prevShowProfile);
  }, []);

  // Handle user logout
  const handleLogout = useCallback(() => {
    dispatch(logout());
    setShowProfile(false);
  }, [dispatch]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ARZ/category");
        
        setCategories(response.data);
      } catch (error) {
        console.error('Fetch Categories error:', error);
      }
    };
    fetchCategories();
  }, []);

  // Memoize ProfileImage and PGroup to prevent unnecessary re-renders
  const ProfileImageMemo = React.memo(() => (
    user?.image ? (
      <ProfileImage
        initialImage={user.image}
        width="3.2rem"
        height="3.2rem"
      />
    ) : (
      <AccountCircleIcon style={{ color: "white", width: "3rem", height: "3rem" }} />
    )
  ));

  const PGroupMemo = React.memo(() => (
    showProfile && (
      <PGroup
        PImage={user?.image ? user.image : <AccountCircleIcon style={{ color: "white", width: "3rem", height: "3rem" }} />}
        Name={user?.name || ""}
        Email={user?.email || ""}
        LogOut={user ? handleLogout : ""}
      />
    )
  ));

  
  return (
    <nav className="navbar navbar-expand-lg bg-black" style={{height:"100%"}}>
      <div className="container-fluid NavC" >
        <span>
          <Link className="navbar-brand" to="#">
            <img 
              src="/assets/Images/Logo.png" 
              className='logo' 
              style={{ width: "10rem", margin: "1rem" }} 
              alt="Logo" 
            />
          </Link>
        </span>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item px-3">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/about">About</Link>
            </li>

    <NavDropdown title="Category" id="basic-nav-dropdown">
      {categories.map(category => (
        <NavDropdown.Item key={category._id} href={`/category/${category._id}`}>
          {category.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="N-Btn d-flex flex-column justify-content-center align-items-center">
          {/* Profile */}
          <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            <ProfileImageMemo />
          </div>
          {/* Conditional rendering of PGroup */}
          <PGroupMemo />
        </div>
      </div>
    </nav>
  );
}

export default NavbarC;
