import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../CSSFiles/Welcome.css';
import '../responsive.css';
import PaidIcon from '@mui/icons-material/Paid';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import { toast } from 'react-toastify';
import axios from 'axios';
import { postAdvertisment } from '../redux/thunks/advertismentThunk';

function Prac() {
  const [advertisment, setAdvertisment] = useState({
    name: '',
    price: '',
    descriptions: '',
    postedById: '',
    postOn: '',
    expireOn: "",
    categoryId: '',
    cityAreasId: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState([]);
  const [cityAreas, setCityAreas] = useState([]);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdvertisment({ ...advertisment, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data for file upload
    const formData = new FormData();
    formData.append('name', advertisment.name);
    formData.append('price', advertisment.price);
    formData.append('descriptions', advertisment.descriptions);
    formData.append('postedById', user._id);
    formData.append('postOn', new Date().toISOString());
    formData.append('expireOn', new Date(new Date().setDate(new Date().getDate() + 15)).toISOString());
    formData.append('categoryId', advertisment.categoryId);
    formData.append('cityAreasId', advertisment.cityAreasId);
    if (image) {
      formData.append('image', image);
    }

    try {
      const resultAction = await dispatch(postAdvertisment(formData));
      if (postAdvertisment.fulfilled.match(resultAction)) {
        toast.success('Post submitted successfully');
        navigate('/'); // Navigate to home or another page on success
      } else {
        toast.error('Failed to submit post');
        throw new Error('Failed to post advertisement');
      }
    } catch (error) {
      console.error('Error posting advertisement:', error);
      toast.error('Failed to post advertisement');
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ARZ/category");
        setCategories(response.data);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };

    const fetchCityAreas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ARZ/cityarea");
        setCityAreas(response.data);
      } catch (error) {
        console.log('Error fetching city areas:', error);
      }
    };

    fetchCategories();
    fetchCityAreas();
  }, []);

  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 15);
  const formattedEndDate = endDate.toLocaleDateString();

  const clickBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className='mainContainer container-fluid'>
      <div className='SsmPage p-5 container h-auto w-50 my-2 d-flex flex-column align-items-center text-center'>
        <form onSubmit={handleSubmit} className='smSpage position-relative p-4 mx-6 d-flex flex-column align-items-center text-center'>
          <h2 className='mt-2'><strong>POST<br />Advertisement</strong></h2>
          <div className='form-group'>
            <label htmlFor='imageUpload'>Upload Image</label>
            <input
              id='imageUpload'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              name='image'
              className='selectImage'
            />
            {imagePreview && <img src={imagePreview} alt='Preview' style={{ width: '200px', marginTop: '10px' }} />}
          </div>

          <div className='containrer-xl inputG p-2 d-flex flex-column justify-content-center align-items-center'>
            <div className='block px-3 d-flex'>
              <div className="input-group flex-nowrap mx-1">
                <label htmlFor='name' className="visually-hidden">Name</label>
                <input 
                  className="form-control my-2" 
                  type="text"
                  name='name'
                  id='name'
                  value={advertisment.name}
                  onChange={handleChange}
                  placeholder="Name"
                  aria-label="Name" 
                />
                <span className="input-group-text my-2 bgicon"><PersonRoundedIcon className='icon' /></span>
              </div>

              <div className="input-group flex-nowrap mx-1">
                <label htmlFor='price' className="visually-hidden">Price</label>
                <input 
                  className="form-control my-2"
                  type="number"
                  name='price'
                  id='price'
                  value={advertisment.price}
                  onChange={handleChange}
                  placeholder="Price"
                  aria-label="Price" 
                />
                <span className="input-group-text my-2 bgicon"><PaidIcon className='icon' /></span>
              </div>
            </div>

            <div className="input-group flex-nowrap">
              <label htmlFor='descriptions' className="visually-hidden">Description</label>
              <textarea 
                className="form-control my-2"
                name='descriptions'
                id='descriptions'
                value={advertisment.descriptions}
                onChange={handleChange}
                placeholder="Description"
                aria-label="Description" 
              />
              <span className="input-group-text my-2 bgicon"><DescriptionIcon className='icon' /></span>
            </div>

            <p className='Pdetail'><strong>User : </strong> {user._id}</p>
            <h6 className='Pdetail'><strong>Post Date :</strong> {currentDate.toLocaleDateString()}</h6>
            <h6 className='Pdetail'><strong>End Date :</strong> {formattedEndDate}</h6>

            <label htmlFor='category'><strong>Categories</strong></label>
            <select
              id='category'
              name="categoryId"
              value={advertisment.categoryId}
              onChange={(e) => setAdvertisment({ ...advertisment, categoryId: e.target.value })}
              className='mb-3'
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>{category.name}</option>
              ))}
            </select>

            <label htmlFor='city'><strong>City Areas</strong></label>
            <select
              id='city'
              name="cityAreasId"
              value={advertisment.cityAreasId}
              onChange={(e) => setAdvertisment({ ...advertisment, cityAreasId: e.target.value })}
              className='mb-1'
            >
              <option value="">Select City Area</option>
              {cityAreas.map((cityArea) => (
                <option value={cityArea._id} key={cityArea._id}>{cityArea.name}</option>
              ))}
            </select>
          </div>

          <button className='Wbtn btn btn-secondary my-1 mb-4 mt-4' type="submit">Post</button>

          <div className='Spart px-4'>
            <div className='py-3'>
              <div className='d-flex p-0 align-items-center d-flex flex-row align-items-left'>
                <a className='mb-4' onClick={clickBack}>
                  <ArrowBackIosNewSharpIcon /><strong>Back</strong>
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Prac;
