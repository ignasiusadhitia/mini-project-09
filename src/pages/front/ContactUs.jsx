import React from 'react';

import { FormProvider, useFormContext } from '@/context/FormContext';
import contactUsServices from '@/services/contactUsServices';
const ContactUsForm = () => {
  const { values, resetForm, handleChange, purify } = useFormContext();

  const onSubmit = async (event) => {
    event.preventDefault();
    const purifiedData = {
      name: purify.sanitize(values.name),
      email: purify.sanitize(values.email),
      website: purify.sanitize(values.website),
      message: purify.sanitize(values.message),
    };

    try {
      await contactUsServices.sendMessage(purifiedData);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>
      ContactUs
      <form onSubmit={onSubmit}>
        <input
          name="name"
          placeholder="Name"
          type="text"
          value={values?.name || ''}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={values?.email || ''}
          onChange={handleChange}
        />
        <input
          name="website"
          placeholder="Website"
          type="website"
          value={values?.website || ''}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Messages"
          value={values?.message || ''}
          onChange={handleChange}
        />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

const ContactUs = () => {
  return (
    <FormProvider>
      <ContactUsForm />
    </FormProvider>
  );
};

export default ContactUs;
