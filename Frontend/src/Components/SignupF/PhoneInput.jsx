import React, { useCallback } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function MyPhoneInput({ form, setForm }) {
  // useCallback Hook
  const handleChangePN = useCallback((value) => {
    setForm(prevForm => ({
      ...prevForm,
      contactNumber: value,
    }));
  }, [setForm]);

  return (
    <>
      {/* <label htmlFor="contactNumber">Contact Number:</label> */}
      <PhoneInput
        inputProps={{
          id: 'contactNumber',
          name: 'contactNumber',
          required: true,
          autoFocus: true,
        }}
        
        type="tel"
        country={'pk'}
        value={form.contactNumber}
        onChange={handleChangePN}
        autoComplete="tel"
      />
    </>
  );
}

export default MyPhoneInput;
