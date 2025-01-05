// ReadAdv.jsx
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdvertisment } from '../redux/thunks/advertismentThunk';
import LCard from '../Components/LCard';
import { useParams } from 'react-router-dom';
import '../CSSFiles/ReadAdv.css';

const getCategoryAndCityArea = (ad) => ({
    category: ad.categoryId?.name || 'Unknown Category',
    cityArea: ad.cityAreasId?.name || 'Unknown City Area',
});

const ReadAdv = () => {
    const { advertisments, loading, error } = useSelector(state => state.advertisment);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllAdvertisment());
    }, [dispatch]);

    const filteredAds = id ? advertisments.filter(ad => ad._id === id) : advertisments;

    const handleBackClick = useCallback(() => {
        window.history.back();
    }, []);

    return (
        <div className="page-background">
            <div className="glass-container">
                <h1><strong>Advertisements</strong></h1>
                {loading && <p>Loading advertisements...</p>}
                {error && <p>Error loading advertisements: {error.message}</p>}
                <div className="ads-grid mt-5">
                    {filteredAds.length > 0 ? (
                        filteredAds.map(adver => {
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
                <button type="button" className="btn px-4 ReadBtn" onClick={handleBackClick}>Back</button>
            </div>
        </div>
    );
};

export default ReadAdv;
