import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/thunks/userThunks';
import { useNavigate } from 'react-router-dom';
import '../CSSFiles/Welcome.css';
import Loading from '../Components/Loading';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

// Toastify
import { toast } from 'react-toastify';

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }, [form]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    dispatch(login(form)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        navigate("/otpinput", { state: { email: form.email } });
        toast.success('Email has been sent!');
      } else {
        toast.error('Email has not been sent!');
      }
    });
  }, [dispatch, form, navigate]);

  const clickSignup = () => {
    navigate("/signup");
  };

  const clickBack = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/welcome");
  };

  return (
    <>
      {loading && <Loading />}
      <div className='mainContainer container-fluid'>
        <div className='smPage px-3 container h-auto w-50 mx-auto my-2 d-flex flex-column align-items-center text-center'>
          {/* Form */}
          <img src="/assets/Images/SLImg.png" className="WImg img-fluid py-1 my-4" alt="Error" />
          <form onSubmit={handleSubmit} className='smLpage position-relative px-4 py-4 mx-6'>
            <h5>Sign In</h5>

            <div className="input-group flex-nowrap">
              <input
                className="form-control my-2"
                type="text"
                value={form.email}
                name='email'
                onChange={handleChange}
                placeholder="Email"
                aria-describedby="addon-wrapping"
                autoComplete="email"
              />
              <span className="input-group-text my-2 bgicon" id="addon-wrapping">
                <EmailIcon className='icon' />
              </span>
            </div>

            <div className="input-group flex-nowrap">
              <input
                className="form-control my-2"
                type="password"
                name='password'
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                aria-describedby="addon-wrapping"
                autoComplete="current-password"
              />
              <span className="input-group-text my-2 bgicon" id="addon-wrapping">
                <KeyIcon className='icon' />
              </span>
            </div>

            <button className='Wbtn btn btn-secondary my-1 mb-4 mt-4' type="submit">
              Sign In
            </button>
          </form>

          {/* Last part */}
          <div className='Lpart px-4 d-flex'>
            <div className='py-3'>
              <div className='d-flex p-0 align-items-center d-flex flex-row align-items-left'>
                <a className='mb-4' href="/" onClick={clickBack}>
                  <ArrowBackIosNewSharpIcon /><strong>Back</strong>
                </a>
              </div>
            </div>
            <div className='text-end'>
              <p className='mt-3 mb-0'>Don't have an Account?</p>
              <strong><a className='pt-0' onClick={clickSignup}>Signup</a></strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
