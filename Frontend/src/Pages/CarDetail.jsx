import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import NavbarC from '../Components/NavbarC';
import FooterC from '../Components/FooterC';

// RTK
import { getAdvertismentById } from '../redux/thunks/advertismentThunk';

// CSS
import '../CSSFiles/CarDetail.css';

// Icons
import CategoryIcon from '@mui/icons-material/Category';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

function CarDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const advertisment = useSelector((state) => state.advertisment.filteredAdvertismentById);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    dispatch(getAdvertismentById(id));
  }, [id, dispatch]);

  if (!advertisment) {
    return <div>Loading...</div>;
  }

  const { image, name, price, descriptions, categoryId, cityAreasId, postedById } = advertisment;

  return (
    <>
      <NavbarC />
      <div className='MDconatiner container-fluid d-flex flex-column align-items-center '>
        {image ? (
          <img
            src={image}
            alt="Advertisement"
            style={{ width: "100%", maxWidth: "600px", height: "auto", borderRadius: "1rem" }}
          />
        ) : (
          <div>No image available</div>
        )}
        <div className='block d-flex flex-column flex-md-row justify-content-between' style={{ width: "100%", maxWidth: "1200px", marginTop: "1rem" }}>
          <div className="container D_glass text-left d-flex flex-column p-3">
            <div className='d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center'>
              <h2><strong>{name}</strong></h2>
              <p id='price'><strong>${price}</strong></p>
            </div>

            <div className='d-flex flex-column flex-md-row mt-3'>
              <div className='d-flex align-items-center mx-2'>
                <CategoryIcon style={{ color: "red" }} />
                <p id='category' className='mb-0 mx-2'>{categoryId?.name || 'Unknown'}</p>
              </div>
              <div className='d-flex align-items-center mx-2'>
                <LocationCityIcon style={{ color: "red" }} />
                <p id='cityArea' className='mb-0 mx-2'>{cityAreasId?.name || 'Unknown'}</p>
              </div>
              <div className='d-flex align-items-center mx-2'>
                <AcUnitIcon style={{ color: "red" }} />
                <p id='ac' className='mb-0 mx-2'>AC</p>
              </div>
            </div>
            <hr style={{ color: "red", border: "2px solid red" }} />

            <h5><strong>Description:</strong></h5>
            <p style={{ fontSize: "0.9rem" }} >{descriptions}</p>

          </div>

          {/* Block 2 */}
          <div className={`p_glass d-flex flex-column justify-content-center align-items-center text-center ${showProfile ? 'active' : ''}`} style={{ height: "auto", maxWidth: "300px", gap: "1rem" }}>
            {postedById?.image && <img src={postedById.image} alt="Posted by" style={{ borderRadius: "50%", width: "6rem", height: "6rem" }} />}
            <h4><strong>{postedById?.name || 'Anonymous'}</strong></h4>
            
            <div className='d-flex flex-column align-items-start justify-content-center'>
            <div className='d-flex align-items-center justify-content-center p-2'>
              <EmailIcon style={{ color: 'red', marginRight: '8px' }} />
              <p id='email' style={{ margin: 0 ,fontSize:"0.6rem" }}>{postedById?.email || 'Not available'}</p>
            </div>

            <div className='d-flex align-items-center justify-content-center p-2'>
              <PhoneAndroidIcon style={{ color: 'red', marginRight: '8px' }} />
              <p style={{ margin: 0 ,fontSize:"0.6rem"}}>{postedById?.contactNumber || 'Not available'}</p>
            </div>
            </div>
            
          </div>
        </div>
      </div>
      <FooterC />
    </>
  );
}

export default CarDetail;
