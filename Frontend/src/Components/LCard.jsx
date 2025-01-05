// LCard.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAdvertisment } from '../redux/thunks/advertismentThunk';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import '../CSSFiles/Lcard.css';
import { toast } from 'react-toastify';

function LCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteAdv = (_id) => {
    if (_id) {
      dispatch(deleteAdvertisment(_id))
        .then(() => {
          toast.success('Advertisement deleted');
        })
        .catch((error) => {
          toast.error(`Failed to delete advertisement: ${error.message}`);
        });
    } else {
      toast.error('Invalid advertisement ID');
    }
  };

  const editAdv = (_id) => {
    navigate(`/editadv/${_id}`);
  };

  const handleCardetail = (_id) => {
    navigate(`/cardetail/${_id}`);
  };

  const handleImageClick = (src) => () => {
    if (src) {
      window.open(src, '_blank');
    }
  };

  return (
    <div className="card l-card p-2">
      <img
        src={props.src}
        className="card-img-top"
        alt={props.title}
        onClick={handleImageClick(props.src)}
        style={{ cursor: 'pointer' }}
      />
      <div className="card-body">
        <h2 className="car-name"><strong>{props.title}</strong></h2>
        <p className="description">{props.description}</p>
        <div className="details">
          <div className="details-left">
            <p style={{ fontSize: '0.8rem' }}><strong>Category:</strong> {props.category}</p>
            <p style={{ fontSize: '0.8rem' }}><strong>City Area:</strong> {props.cityArea}</p>
          </div>
        </div>
        <button
          type="button"
          className="btn mx-1"
          style={{ fontSize: '0.7rem' }}
          onClick={() => handleCardetail(props._id)}
        >
          Details
        </button>
        <div className="details-right">
          <EditNoteIcon
            className="mx-1"
            onClick={() => editAdv(props._id)}
            style={{ color: 'white', fontSize: '2rem', cursor: 'pointer' }}
          />
          <DeleteIcon
            className="mx-1"
            onClick={() => deleteAdv(props._id)}
            style={{ color: 'white', fontSize: '2rem', cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}

export default LCard;
