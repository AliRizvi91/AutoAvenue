import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// Css file
import '../App.css';

const FooterC = memo(() => {
  const navigate = useNavigate();

  const clickSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="container-fluid footer">
        <div className="row">
          <div className="colF">
            <h4>Company</h4>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Privacy Policy</p>
            <p>Terms & Condition</p>
          </div>
          <div className="colF">
            <h4>Quick Links</h4>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Privacy Policy</p>
            <p>Terms & Condition</p>
          </div>
          <div className="colF">
            <h4>Contact</h4>
            <div className="F_C">
              <LocationOnIcon />
              <span>EVS Institute</span>
            </div>
            <div className="F_C">
              <SmartphoneIcon />
              <span>03001387387</span>
            </div>
            <div className="F_C">
              <EmailIcon />
              <span>Email</span>
            </div>
            <div className="F_C">
              <TwitterIcon className="F_icon" />
              <FacebookIcon className="F_icon" />
              <YouTubeIcon className="F_icon" />
              <LinkedInIcon className="F_icon" />
            </div>
          </div>
          <div className="colF">
            <h4>Newsletter</h4>
            <p><strong>Discover the Future of Driving with AutoAvenue!</strong> <br />
            Stay updated with the latest car reviews, industry trends, and exclusive offers delivered straight to your inbox.</p>
            <button type="button" className="btn px-4 mx-1 f_btn" onClick={clickSignup}>Sign Up</button>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0 F_end">
        <p>Copyright &copy; 2024. Designed By <span>"Ali Raza Attari" [ ARZ ]</span></p>
      </div>
    </>
  );
});

export default FooterC;
