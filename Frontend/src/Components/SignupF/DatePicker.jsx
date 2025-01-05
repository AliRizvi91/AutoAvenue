import React, { useCallback } from 'react';
import '../../CSSFiles/Welcome.css';

// icons
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

function DateSelector({ form, setForm }) {
  // callback the handleChange function
  const handleChange = useCallback((date) => {
    setForm((prevForm) => ({
      ...prevForm,
      birthDate: date,
    }));
  }, [setForm]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} className="date-picker-wrapper d-flex ">
        <span style={{fontSize:"0.6rem"}}><strong>BirthDate</strong></span>
        <MuiDatePicker
          id="birthdate-picker"
          value={form.birthDate}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateSelector;
