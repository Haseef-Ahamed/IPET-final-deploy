/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// FormContext.jsx
import React, { createContext, useContext, useState } from 'react';
// import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personalInfo: null,
    academicInfo: null,
    trainingInfo: null,
    membershipInfo: null
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);