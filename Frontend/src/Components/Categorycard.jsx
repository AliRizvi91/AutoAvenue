import React from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import '../CSSFiles/category.css'

// Toastify for notifications
import { toast } from 'react-toastify';

function Categorycard(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteAdv = (_id) => {
    if (_id) {
      dispatch(deleteAdvertisment(_id))
        .then(() => {
          toast.success('Advertisement deleted');
        })
        .catch((error) => {
          toast.error('Failed to delete advertisement',error);
        });
    } else {
      toast.error('Invalid advertisement ID');
    }
  };

  const editAdv = (_id) => {
    navigate(`/editadv/${_id}`);
  };
  return (
    <>

     <div className="container-fluid Category_C d-flex C_Glass my-1 mx-3 px-5" style={{textAlign:"left"}}>
      <img src={props.src} className="img-thumbnail categoryImg" style={{width:"auto",height:"13rem",padding:"0px",margin:"5px 5px",border:'none' , borderRadius:"1rem",outline:"none"}} alt="ERROR"/>
      <div className="container">
        <h2 style={{fontWeight:"bold"}}>{props.name}</h2>
        <span style={{color:"white" ,fontSize:"0.7rem" , textAlign:"left"}} className='description'>{props.para}</span>
        <div>
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
        <button type="button" className="btn px-4 mx-1">Details</button>

        </div>
      </div>
      </div> 
    </>
  )
}

export default Categorycard
