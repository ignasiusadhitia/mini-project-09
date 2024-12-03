import { createContext } from 'react';

import PropTypes from 'prop-types';

import { useForm, useMultipartForm, usePurify } from '@hooks';

const FormContext = createContext();

export const FormProvider = ({ children, isMultipart = false }) => {
  const multipartForm = useMultipartForm();
  const regularForm = useForm();
  const form = isMultipart ? multipartForm : regularForm;
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
