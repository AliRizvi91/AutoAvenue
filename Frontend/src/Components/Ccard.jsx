import React from 'react'
import {Link} from 'react-router-dom'
import Icon from '@mui/material/Icon';

function Ccard(props) {
    return (
      <Link to={props.href} style={{ textDecoration: 'none' }}>
      <div className="card text-center" style={{position:"relative",display:"flex", justifyContent:"center", alignItems:'center',margin:"2rem", width:""}}>
        <Icon >
              {props.icon}
        </Icon>
        <div style={{position:'relative',fontSize:"1rem",color:"red"}}>{props.title}</div>

      </div>
      </Link>

    );
  }


export default Ccard
