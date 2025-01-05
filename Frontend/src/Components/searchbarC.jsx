import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { searchAdvertisment } from '../redux/thunks/advertismentThunk';
import LCard from './LCard';
import axios from 'axios';

// SelectHoverFunctions

function setSelectHover(selector = "select") {
  let selects = document.querySelectorAll(selector);
  selects.forEach((select) => {
    let selectWrap = select.parentNode.closest(".select-wrap");
    // wrap select element if not previously wrapped
    if (!selectWrap) {
      selectWrap = document.createElement("div");
      selectWrap.classList.add("select-wrap");
      select.parentNode.insertBefore(selectWrap, select);
      selectWrap.appendChild(select);
    }
    // set expanded height according to options
    let size = select.querySelectorAll("option").length;

    // adjust height on resize
    const getSelectHeight = () => {
      selectWrap.style.height = "auto";
      let selectHeight = select.getBoundingClientRect();
      selectWrap.style.height = selectHeight.height + "px";
    };
    getSelectHeight(select);
    window.addEventListener("resize", (e) => {
      getSelectHeight(select);
    });

    /**
     * focus and click events will coincide
     * adding a delay via setTimeout() enables the handling of
     * clicks events after the select is focused
     */
    let hasFocus = false;
    select.addEventListener("focus", (e) => {
      select.setAttribute("size", size);
      setTimeout(() => {
        hasFocus = true;
      }, 150);
    });

    // close select if already expanded via focus event
    select.addEventListener("click", (e) => {
      if (hasFocus) {
        select.blur();
        hasFocus = false;
      }
    });

    // close select if selection was set via keyboard controls
    select.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        select.removeAttribute("size");
        select.blur();
      }
    });

    // collapse select
    select.addEventListener("blur", (e) => {
      select.removeAttribute("size");
      hasFocus = false;
    });
  });
}


function SearchbarC() {
  setSelectHover();
  const [categories, setCategories] = useState([]);
  const [cityAreas, setCityAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCityArea, setSelectedCityArea] = useState('');
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const { filteredAdvertisments, loading } = useSelector(state => state.advertisment);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ARZ/category");
        setCategories(response.data);
      } catch (error) {
        console.error('Fetch Categories Error', error);
      }
    };

    const fetchCityAreas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ARZ/cityarea");
        setCityAreas(response.data);
      } catch (error) {
        console.error('Fetch City Areas Error', error);
      }
    };

    fetchCategories();
    fetchCityAreas();
  }, []);

  const handleSearch = async () => {
    try {
      console.log('Dispatching searchAdvertisment with payload:', {
        Keyword: keyword,
        category: selectedCategory,
        cityArea: selectedCityArea
      });
      dispatch(searchAdvertisment({
        Keyword: keyword,
        category: selectedCategory,
        cityArea: selectedCityArea
      }));
    } catch (error) {
      console.error('Search Error', error);
    }
  };

  
  return (
    <div className='container-fluid searchbar' style={{height:'100%'}}>
      <div className="input-group">
        <input
          type="text"
          id="keyword-input"
          name="keyword"
          className="form-control inputC"
          placeholder="KEYWORD"
          aria-label="KEYWORD"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Form.Select
          id="category-select"
          name="category"
          className='inputC selectHovercolor'
          aria-label="Select Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option value={category._id} key={category._id}>{category.name}</option>
          ))}
        </Form.Select>

        <Form.Select
          id="cityarea-select"
          name="cityArea"
          className='inputC'
          aria-label="Select City Area"
          value={selectedCityArea}
          onChange={(e) => setSelectedCityArea(e.target.value)}
        >
          <option value="">Select City Area</option>
          {cityAreas.map((cityArea) => (
            <option value={cityArea._id} key={cityArea._id}>{cityArea.name}</option>
          ))}
        </Form.Select>
        
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : filteredAdvertisments && filteredAdvertisments.length > 0 ? (
          filteredAdvertisments.map((ele) => (
            <LCard
              src={ele.image}
              key={ele._id}
              _id={ele._id}
              title={ele.name}
              category={ele.categoryId?.name}
              cityArea={ele.cityAreasId?.name}
            />
          ))
        ) : (
          <p>No advertisements found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchbarC;
