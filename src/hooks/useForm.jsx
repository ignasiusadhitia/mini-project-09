import { useState } from 'react';

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setValues((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === 'file') {
      setValues((prev) => ({
        ...prev,
        [name]: files,
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const resetForm = () => setValues(initialValues);

  return {
    values,
    setValues,
    handleChange,
    resetForm,
    isSubmitting,
    setIsSubmitting,
  };
};

export default useForm;
