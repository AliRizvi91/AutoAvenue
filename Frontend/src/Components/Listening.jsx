import React, { useEffect } from 'react';
import LCard from './LCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllAdvertisment } from '../redux/thunks/advertismentThunk';

// Helper function to get category and city area names
const getCategoryAndCityArea = (ad) => {
  return {
    category: ad.categoryId?.name || 'Unknown Category',
    cityArea: ad.cityAreasId?.name || 'Unknown City Area',
  };
};

function Listening() {
  const navigate = useNavigate();

  // Define the function to navigate with reload
  const onReadAdv = () => {
    navigate('/readadv');
  };

  const { advertisments, loading, error } = useSelector(state => state.advertisment);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllAdvertisment());
  }, [dispatch]);

  // Filter and slice the ads
  const filteredAds = id ? advertisments.filter(ad => ad._id === id) : advertisments;
  const adsToShow = filteredAds.slice(0, 3); // Show only the first 3 ads

  return (
    <>
      <div className='container-fluid px-0 text-center' style={{ height: 'auto', width: 'auto' }}>
        <h3 className='text-center' style={{ textAlign: 'start' }}>ADVERTISMENT LISTENING</h3>

        <div className="container L_Glass" style={{ marginTop: '8rem', marginBottom: '3rem' }}>
          <div className="container text-center">
            {loading && <p>Loading advertisements...</p>}
            {error && <p>Error loading advertisements: {error.message}</p>}
            <div className="ads-grid mt-5">
              {adsToShow.length > 0 ? (
                adsToShow.map((adver) => {
                  const src = adver.image || '';
                  const title = adver.name || '';
                  const description = adver.descriptions || '';
                  const { category, cityArea } = getCategoryAndCityArea(adver);

                  return (
                    <LCard
                      className="ad-card"
                      src={src}
                      key={adver._id}
                      _id={adver._id}
                      title={title}
                      description={description}
                      category={category}
                      cityArea={cityArea}
                    />
                  );
                })
              ) : (
                <p>No advertisements found.</p>
              )}
            </div>
            <button className='Wbtn btn btn-secondary px-3 my-1 mb-4 mt-4' type="button" onClick={onReadAdv}>Show More</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Listening;
