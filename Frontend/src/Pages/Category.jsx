import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvertismentsByCategory } from '../redux/thunks/advertismentThunk';

// Components
import NavbarC from '../Components/NavbarC';
import Categorycard from '../Components/Categorycard';
import FooterC from '../Components/FooterC';
import Loading from '../Components/Loading';

function Category() {
  const { id } = useParams();  // Get the category ID from the URL parameters
  const dispatch = useDispatch();
  const { filteredAdvertismentByCategory, loading, error } = useSelector((state) => state.advertisment);

  useEffect(() => {
    dispatch(fetchAdvertismentsByCategory(id));
  }, [dispatch, id]);

  return (
    <>
      <NavbarC />
      
      <img src="/assets/Images/BGcategory.png" className="img-fluid" alt="ERROR"/>
      <div className="container-fluid text-center mb-5 d-flex flex-column " style={{justifyContent:"center",alignItems:"center"}}>
        <h1 style={{ margin: "6rem 0rem" }} className="C-H">ADVERTISMENT CATEGORY</h1>
        {loading && <Loading/>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && filteredAdvertismentByCategory && filteredAdvertismentByCategory.length > 0 ? (
          filteredAdvertismentByCategory.map((ad, index) => (
            <Categorycard
              key={index}
              src={ad.image} // Assuming image is a property of your ad object
              name={ad.name} // Assuming name is a property of your ad object
              para={ad.descriptions} // Assuming description is a property of your ad object
            />
          ))
        ) : (
          <p>No advertisements found for this category.</p>
        ) 
        }
      </div>
      <FooterC />
    </>
  );
}

export default Category;
