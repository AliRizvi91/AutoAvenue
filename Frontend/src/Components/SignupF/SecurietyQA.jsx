import React, { useCallback, useMemo } from 'react';
import '../../CSSFiles/Loading.css';

function SecurityQA({ form, setForm }) {

  const securityQuestions =  [
    '>  Select a security question',
    "What is your mother's maiden name?",
    'What city were you born in?',
    'What is your favorite movie?',
    'What is the name of your first pet?',
    'What is your favorite holiday destination?',
  ]; 

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, [setForm]); // Dependency array includes setForm if it changes

  return (
    <>
      <select
        id="securityquestion"
        name="securityquestion"
        value={form.securityquestion}
        onChange={handleChange}
        className="form-select my-2"
      >
        {useMemo(() =>securityQuestions.map((question, index) => (
          <option key={index} value={question}>
            {question}
          </option>
        )),[securityQuestions]) // Empty dependency array means this array will only be created once
        }
      </select>

      <input
       className="form-control my-2 "
        type="text"
        name="securityanswer"
        value={form.securityanswer}
        onChange={handleChange}
        placeholder="Security Answer"
        autoComplete="off"
      />
    </>
  );
}

export default SecurityQA;
