import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSSFiles/Welcome.css';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';

function Welcome() {
  const navigate = useNavigate();

  const clickSignup = () => {
    navigate("/signup");
  };

  const clickSignin = () => {
    navigate("/login");
  };

  const clickBack = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/");
  };

  return (
    <div className='mainContainer container-fluid'>
      <div className='smPage container h-auto w-50 mx-auto my-2 d-flex flex-column align-items-center text-center'>
        <div className='sm2page position-relative px-4 py-4'>
          <h3>Welcome</h3>
          <p className="textWelcome">
            Welcome to AutoAvenue, your premier destination for seamless automotive transactions! Explore our user-friendly website designed to simplify your buying and selling experience with cutting-edge features and personalized service. We're excited to guide you through every step of the process, ensuring you find exactly what you're looking for with ease and confidence.
          </p>
        </div>
        <img src="/assets/Images/SLImg.png" className="WImg img-fluid" alt="Error" />
        <h5>AutoAvenue</h5>

        <button className='Wbtn btn btn-primary my-1 mt-4' onClick={clickSignup}>Sign Up</button>
        <button className='Wbtn btn btn-secondary my-1 mb-4' onClick={clickSignin}>Sign In</button>

        <div className='position-relative bottom-0 p-3'>
          <div className='d-flex align-items-center d-flex flex-row align-items-left'>
            <a className='ms-2' href="/" onClick={clickBack}>
              <ArrowBackIosNewSharpIcon /> Back
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
