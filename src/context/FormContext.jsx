import React, { createContext, useContext } from 'react';

import PropTypes from 'prop-types';

import { useForm, useMultipartForm, usePurify } from '@hooks';

const FormContext = createContext();

export const FormProvider = ({ children, isMultipart = false }) => {
  const multipartForm = useMultipartForm();
  const standardForm = useForm();
  const form = isMultipart ? multipartForm : standardForm;
  const purify = usePurify();

  return (
    <FormContext.Provider value={{ ...form, purify }}>
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isMultipart: PropTypes.bool,
};

// eslint-disable-next-line
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
