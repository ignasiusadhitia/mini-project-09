import { useState } from 'react';

export const useMultipartForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === 'file') {
      setValues((prev) => ({
        ...prev,
        [name]: files.length > 1 ? files : files[0],
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getFormData = () => {
    const formData = new FormData();
    for (const key in values) {
      if (values[key] instanceof File || values[key] instanceof FileList) {
        if (values[key] instanceof FileList) {
          Array.from(values[key]).forEach((file) => formData.append(key, file));
        } else {
          formData.append(key, values[key]);
        }
      } else {
        formData.append(key, values[key]);
      }
    }
    return formData;
  };

  const resetForm = () => setValues(initialValues);

  return {
    values,
    handleChange,
    getFormData,
    resetForm,
  };
};
