import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/thunks/userThunks';
import { useNavigate } from 'react-router-dom';
import '../CSSFiles/Welcome.css';
import '../responsive.css';
import axios from 'axios';

// =====*********************===== Signup Folder =====*********************===== 
import DateSelector from '../Components/SignupF/DatePicker';
import MyPhoneInput from '../Components/SignupF/PhoneInput';
// import ImageUploader from '../Components/SignupF/imageUploader';
import SecurietyQA from '../Components/SignupF/SecurietyQA';

// =====*********************===== Icons =====*********************===== 
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import KeyIcon from '@mui/icons-material/Key';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';

// =====*********************===== Toastify =====*********************===== 
import { toast } from 'react-toastify';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    securityquestion: '',
    securityanswer: '',
    birthDate: null,
    contactNumber: '',
    image: localStorage.getItem('uploadedImage') || '',
    role: '',
  });

  const [Role, setRole] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

  // =====*********************===== useCallback Hook for handleChange =====*********************===== 
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  // =====*********************===== useCallback Hook for handleSubmit =====*********************===== 
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    await dispatch(signup(form));
  }, [dispatch, form]);

  // =====*********************===== Role setup =====*********************===== 
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ARZ/role");
        setRole(response.data);
      } catch (error) {
        console.log('Fetch Role', error);
      }
    };
    fetchRoles();
  }, []);

  // =====*********************===== Redirect to profile page if user is logged in =====*********************===== 
  useEffect(() => {
    if (user) {
      navigate('/profile');
      toast.success('SignUp is Successful');
    }
  }, [user, navigate]);

  const clickSignin = () => {
    navigate("/login");
  };

  const clickBack = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/welcome");
  };

  return (
    <>
      <div className='mainContainer container-fluid'>
        <div className='SsmPage p-5 container h-auto w-50 my-2 d-flex flex-column align-items-center text-center'>
          {/* Form */}
          <form onSubmit={handleSubmit} className='smSpage position-relative p-4 mx-6 d-flex flex-column align-items-center text-center'>
            <h2 className='mt-2'><strong>Sign Up</strong></h2>

            {/* =====*********************===== Upload Image =====*********************=====  */}

            {/* <ImageUploader form={form} setForm={setForm} /> */}
            <div className='containrer-xl inputG p-2 d-flex justify-content-space-between'>

              {/* =====*********************===== input Block =====*********************=====  */}
              <div className='block px-3'>
                <div className="input-group flex-nowrap">
                  <input 
                    className="form-control my-2" 
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    autoComplete="name"
                    aria-label="Name" 
                  />
                  <span className="input-group-text my-2 bgicon">
                    <PersonRoundedIcon className='icon' />
                  </span>
                </div>

                <div className="input-group flex-nowrap">
                  <input 
                    className="form-control my-2" 
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    autoComplete="email"
                    aria-label="Email" 
                  />
                  <span className="input-group-text my-2 bgicon">
                    <EmailIcon className='icon' />
                  </span>
                </div>

                <div className="input-group flex-nowrap">
                  <input 
                    className="form-control my-2" 
                    type="password"
                    name="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    autoComplete="new-password"
                    aria-label="Password" 
                  />
                  <span className="input-group-text my-2 bgicon">
                    <KeyIcon className='icon' />
                  </span>
                </div>

                {/* =====*********************===== Phone Input =====*********************=====  */}
                <div className="input-group flex-nowrap">
                  <MyPhoneInput 
                    form={form} 
                    setForm={setForm} 
                    className="form-control my-2 react-tel-input" 
                    placeholder="Contact Number" 
                    aria-label="Contact" 
                    id="contactNumber"
                  />
                  <span className="input-group-text my-2 bgicon">
                    <SmartphoneRoundedIcon className='icon' />
                  </span>
                </div>
              </div>

              {/* =====*********************===== Question block =====*********************=====  */}
              {/* =====*********************===== Security (Question & Answer) =====*********************=====  */}
              <div className='block px-3'>
                <SecurietyQA form={form} setForm={setForm} />

                {/* =====*********************===== DateSelector =====*********************=====  */}
                <DateSelector form={form} setForm={setForm} />

                {/* =====*********************===== Role =====*********************=====  */}
                {/* <Role form={form} setForm={setForm} /> */}
                <label htmlFor='role'><strong>Role</strong></label>
                <select
                  id='role'
                  name="role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className='mb-1'
                >
                  <option value="">Select Role</option>
                  {Role.map((role1) => (
                    <option value={role1._id} key={role1._id}>{role1.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button className='Wbtn btn btn-secondary my-1 mb-4 mt-4' type="submit">Sign Up</button>

            {/* =====*********************===== Last part =====*********************=====  */}
            <div className='Spart px-4'>
              <div className='py-3'>
                <div className='d-flex p-0 align-items-center d-flex flex-row align-items-left'>
                  <a className='mb-4' onClick={clickBack}>
                    <ArrowBackIosNewSharpIcon /><strong>Back</strong> 
                  </a>
                </div>
              </div>
              <div className='text-end'>
                <p className='mt-3 mb-0'>You have already an account.</p>
                <strong><a className='pt-0' onClick={clickSignin}>Sign In</a></strong>
              </div>   
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
