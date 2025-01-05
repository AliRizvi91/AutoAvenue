import React, { useState } from 'react';
import axios from 'axios';

// Components
import NavbarC from '../Components/NavbarC';
import FooterC from '../Components/FooterC';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

// Tostify
import { toast } from 'react-toastify';

function Contact() {
  const [createMessage, setCreateMessage] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setCreateMessage({ ...createMessage, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!createMessage.name || !createMessage.email || !createMessage.subject || !createMessage.message) {
      return toast.error('Please fill in all fields');
    }

    

    try {
      const response = await axios.post('http://localhost:5000/api/ARZ/User/message', createMessage);
      console.log(response.data);
      toast.success('Message sent successfully!');
      // Reset form fields
      setCreateMessage({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.log('Contact Message is not Sent! due to error', error);
      toast.error('Failed to send message, please Login/Signup');

    }
  };

  return (
    <>
      <NavbarC />
      
      <img src="/assets/Images/BGcontact.png" className="img-fluid" alt="ERROR"/>
      <div className="container-fluid text-center">
        <h2 style={{ fontWeight: 'bold' }}>Contact For Any Query</h2>
        <div className="container-fluid d-flex C_Glass mx-0" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div className="row">
            <div className="inf d-flex Ccard col" style={{ alignItems: 'center', justifyContent: 'center', height: 'auto', width: 'auto', padding: '1rem', borderRadius: '0.5rem', margin: '0.5rem 1rem' }}>
              <span style={{ backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LocationOnIcon style={{ fontSize: '2rem', position: 'relative', color: 'black' }} />
              </span>
              <p style={{fontSize:"12px"}}>349 Lahore – Kasur Rd, Block M Gulberg III, Lahore, Punjab 75300, Pakistan</p>
            </div>

            <div className="inf d-flex Ccard col" style={{ alignItems: 'center', justifyContent: 'center', height: 'auto', width: 'auto', padding: '1rem', borderRadius: '0.5rem', margin: '0.5rem 1rem' }}>
              <span style={{ backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <EmailIcon style={{ fontSize: '2rem', position: 'relative', color: 'black' }} />
              </span>
              <p >example@gmail.com</p>
            </div>

            <div className="inf d-flex Ccard col" style={{ alignItems: 'center', justifyContent: 'center', height: 'auto', width: 'auto', padding: '1rem', borderRadius: '0.5rem', margin: '0.5rem 1rem' }}>
              <span style={{ backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PhoneIcon style={{ fontSize: '2rem', position: 'relative', color: 'black' }} />
              </span>
              <h6>03001387387</h6>
            </div>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="container-fluid contact_C">
        <div className="row">
          <div className="col mx-0">
            <iframe
              title="Google Maps Embed"
              className="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d850.5475256806039!2d74.33668783877765!3d31.491458101211705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919043fb52276b5%3A0x2682e1fa63fcd065!2sEVS%20Training%20Institute%20Lahore!5e0!3m2!1sen!2s!4v1719248678883!5m2!1sen!2s"
              width="950"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: '2px solid red', borderRadius: '0.8rem' }}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="col mx-0 text-start d-flex pe-3" style={{ flexDirection: 'column' }}>
  <p>Please make sure to send the message to the owner. They need to receive this information directly</p>

  <div className="input-group mb-3" id="chat">
    <input
      type="text"
      className="form-control"
      placeholder="Your Name"
      name="name"
      value={createMessage.name}
      onChange={handleChange}
      aria-label="Name"
      aria-describedby="basic-addon1"
      autoComplete="name"
    />
  </div>

  <div className="input-group mb-3">
    <input
      type="email"
      className="form-control"
      placeholder="Your Email"
      name="email"
      value={createMessage.email}
      onChange={handleChange}
      aria-label="Email"
      aria-describedby="basic-addon2"
      autoComplete="email"
    />
    <span className="input-group-text label" id="basic-addon2">@gmail.com</span>
  </div>

  <div className="input-group mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="Subject"
      name="subject"
      value={createMessage.subject}
      onChange={handleChange}
      aria-label="Subject"
      aria-describedby="basic-addon2"
      autoComplete="off" // or use "organization-title" if it fits your case
    />
  </div>

  <div className="input-group">
    <span className="input-group-text label">Message</span>
    <textarea
      type="text"
      className="form-control"
      name="message"
      value={createMessage.message}
      onChange={handleChange}
      aria-label="Message"
      style={{ height: '8.7rem' }}
      autoComplete="off"
    ></textarea>
  </div>

  <button className="Wbtn btn btn-secondary my-1 mb-4 mt-4" type="submit">Post</button>
</form>

        </div>
      </div>
      <FooterC />
    </>
  );
}

export default Contact;
