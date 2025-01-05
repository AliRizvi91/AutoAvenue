import React, { useEffect, useState } from 'react';
import Ccard from './Ccard';
// Icon imports
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TimelineIcon from '@mui/icons-material/Timeline';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ArchitectureIcon from '@mui/icons-material/Architecture';
// Axios import
import axios from 'axios';

function CategoryC() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ARZ/category");
        setCategories(response.data);
      } catch (error) {
        console.error('Fetch Categories Error:', error);
      }
    };
    fetchCategories();
  }, []);

  const icons = [
    <MarkAsUnreadIcon className='icon' style={{ fontSize: '5rem', color: "white" }} />,
    <HeadsetMicIcon className='icon' style={{ fontSize: '5rem', color: "white" }} />,
    <DirectionsRailwayIcon className='icon' style={{ fontSize: '5rem', color: "white" }} />,
    <FormatListNumberedIcon className='icon' style={{ fontSize: '5rem', color: "white" }} />,
    <TimelineIcon className='icon' style={{ fontSize: '5rem', color: "white" }} />,
    <HandshakeIcon className='icon' style={{ fontSize: '5rem', color: "white" }} />,
    <LocalLibraryIcon className='icon' style={{ fontSize: '5rem', color: "white" }} />,
    <ArchitectureIcon className='icon' style={{ fontSize: '5rem', color: "white" }} />
  ];

  return (
    <div className='container-fluid category_B px-0' style={{
      height: '56rem',
      backgroundImage: `url('/assets/Images/Category.png')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      <h3 className='text-center' style={{ textAlign: "start" }}>EXPLORE BY CATEGORY</h3>

      <div className="container CardBox text-center" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
      }}>
        <div className="row">
          {categories.slice(0, 8).map((category, index) => (
            <div className="col" key={category._id}>
              <Ccard
                icon={icons[index] || <MarkAsUnreadIcon className='icon' style={{ fontSize: '5rem', color: "white" }} />}
                title={category.name}
                href={`/category/${category._id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryC;
