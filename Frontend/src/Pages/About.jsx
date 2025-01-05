import React from 'react'

// Components
import NavbarC from '../Components/NavbarC'
import FooterC from '../Components/FooterC'

// Icon
import DoneIcon from '@mui/icons-material/Done';

// Css Files
import "../CSSFiles/About.css"



function About() {

  return (
    <>
    <NavbarC/>
          <img src="/assets/Images/BGabout.png" className="img-fluid" alt="ERROR"/>
    <div className="container-fluid C_Glass aboutC" style={{marginTop:"9rem",marginBottom:"2rem" }}>
      <div className='row about ' style={{}}>
        <div className="col aboutImg" style={{display:'flex',alignItems:"center", flexDirection:"column"}}>
          <img src="/assets/Images/AboutImg.png" className="img-fluid aboutimag2" alt="ERROR"/>
          </div>
        <div className="col about_desc" style={{paddingTop:"11rem"}}>
          <h3 style={{fontWeight:"bold"}} ><strong style={{color:"red"}}>AutoAvenue</strong> is a comprehensive Platform where users can browser,buy,sell and compare cars</h3>
          <p style={{color:"white", fontSize:'0.9rem'}}>
          AutoAvenue is a versatile online platform designed to streamline the process of buying, selling, and comparing cars. Users can browse a vast inventory of vehicles from various makes and models, making it easy to find options that meet their specific preferences and needs. <br />
          <br /> In addition to browsing, AutoAvenue offers robust tools for comparing different cars side-by-side. This feature allows users to evaluate key attributes such as performance, fuel efficiency, and safety ratings to find the best fit. For those looking to sell, the platform facilitates a seamless process for listing and promoting vehicles to a wide audience.</p>
          <div>
            <DoneIcon style={{color:"red"}}/>
            <span style={{color:"white"}}>Customer Support</span>
          </div>
          <div>
            <DoneIcon style={{color:"red"}}/>
            <span style={{color:"white"}}>Technical Assistance</span>
          </div>
          <div>
            <DoneIcon style={{color:"red"}}/>
            <span style={{color:"white"}}>FeedBack and Suggestion</span>
          </div>
        </div>
      </div>
    </div>
    <FooterC />
    </>
  )
}

export default About
