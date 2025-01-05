import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSSFiles/Welcome.css';
import '../responsive.css';
import PaidIcon from '@mui/icons-material/Paid';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import { toast } from 'react-toastify';
import axios from 'axios';
import { updatePost } from '../redux/thunks/advertismentThunk';

function EditAdv() {
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
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [categories, setCategories] = useState([]);
    const [cityAreas, setCityAreas] = useState([]);

    const { user } = useSelector((state) => state.user);
    const allAdver = useSelector((state) => state.advertisment.advertisments);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {toast.info('Category and CityArea is Selected Compulsary')},[])
    useEffect(() => {
        if (id) {
            const singleAdv = allAdver.find((adv) => adv._id === id);
            if (singleAdv) {
                setAdvertisment({
                    name: singleAdv.name,
                    price: singleAdv.price,
                    descriptions: singleAdv.descriptions,
                    postedById: singleAdv.postedById,
                    postOn: singleAdv.postOn,
                    expireOn: singleAdv.expireOn,
                    categoryId: singleAdv.categoryId,
                    cityAreasId: singleAdv.cityAreasId,
                });
                // Set image preview if there is an existing image
                if (singleAdv.image) {
                    setImagePreview(singleAdv.image);
                }

            } else {
                console.error(`Advertisement with ID ${id} not found.`);
                toast.error('Advertisement not found');
            }
        } else {
            console.error('No ID provided in URL.');
            toast.error('Invalid ID');
        }
    }, [id, allAdver]);

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

        // console.log(advertisment.categoryId);
        // console.log(advertisment.cityAreasId);
        
        const formData = new FormData();
        formData.append('name', advertisment.name);
        formData.append('price', advertisment.price);
        formData.append('descriptions', advertisment.descriptions);
        formData.append('postedById', user._id);
        formData.append('startOn', advertisment.postOn || new Date().toISOString());
        formData.append('expireOn', advertisment.expireOn || new Date(new Date().setDate(new Date().getDate() + 15)).toISOString());
        formData.append('categoryId', advertisment.categoryId);
        formData.append('cityAreasId', advertisment.cityAreasId);
        if (image) {
            formData.append('image', image);
        }
        

        // Log FormData contents for debugging
        // console.log('FormData Contents:');
        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }

        try {
            const resultAction = await dispatch(updatePost({ _id: id, data: formData}));
            if (updatePost.fulfilled.match(resultAction)) {
                toast.success('Post updated successfully');
                navigate('/readadv');
            } else {
                toast.error('Post update failed');
                throw new Error('Failed to update advertisement');
            }
        } catch (error) {
            console.error('Error updating advertisement:', error);
            toast.error('Failed to update advertisement');
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/ARZ/category");
                setCategories(response.data);
            } catch (error) {
                console.log('Fetch Categories', error);
            }
        };

        const fetchCityAreas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/ARZ/cityarea");
                setCityAreas(response.data);
            } catch (error) {
                console.log('Fetch City Areas', error);
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
                    <h2 className='mt-2'><strong>EDIT<br />Advertisement</strong></h2>
                    <div>
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
                                    <input className="form-control my-2" type="text"
                                        name='name'
                                        value={advertisment.name || ''}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        autoComplete="name" aria-label="Username" aria-describedby="addon-wrapping" />
                                    <span className="input-group-text my-2 bgicon" id="addon-wrapping"><PersonRoundedIcon className='icon' /></span>
                                </div>

                                <div className="input-group flex-nowrap mx-1">
                                    <input className="form-control my-2"
                                        type="number"
                                        name='price'
                                        value={advertisment.price || ''}
                                        onChange={handleChange}
                                        placeholder="Price"
                                        autoComplete="price" aria-label="price" aria-describedby="addon-wrapping" />
                                    <span className="input-group-text my-2 bgicon" id="addon-wrapping"><PaidIcon className='icon' /></span>
                                </div>
                            </div>

                            <div className="input-group flex-nowrap">
                                <textarea className="form-control my-2"
                                    name='descriptions'
                                    value={advertisment.descriptions || ''}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    autoComplete="new-descriptions" aria-label="descriptions" aria-describedby="addon-wrapping" />
                                <span className="input-group-text my-2 bgicon" id="addon-wrapping"><DescriptionIcon className='icon' /></span>
                            </div>

                            <p className='Pdetail'><strong>User : </strong> {user._id}</p>
                            <h6 className='Pdetail'><strong>Post Date :</strong> {advertisment.postOn ? new Date(advertisment.postOn).toLocaleDateString() : currentDate.toLocaleDateString()}</h6>
                            <h6 className='Pdetail'><strong>End Date :</strong> {advertisment.expireOn ? new Date(advertisment.expireOn).toLocaleDateString() : formattedEndDate}</h6>

                            <label htmlFor="category"><strong>Categories</strong></label>
                            <select
                                id='category'
                                name="categoryId"
                                value={advertisment.categoryId || ''}
                                onChange={(e) => setAdvertisment({ ...advertisment, [e.target.name]: e.target.value })}
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
                                value={advertisment.cityAreasId || ''}
                                onChange={(e) => setAdvertisment({ ...advertisment, [e.target.name]: e.target.value })}
                                className='mb-1'
                            >
                                <option value="">Select City Areas</option>
                                {cityAreas.map((cityArea) => (
                                    <option value={cityArea._id} key={cityArea._id}>{cityArea.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button className='Wbtn btn btn-secondary my-1 mb-4 mt-4' type="submit">Update</button>

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

export default EditAdv;
