import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import { Typography } from '@/components/commons';
import { Button } from '@/components/ui/button';
import { FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormProvider, useFormContext } from '@/context/FormContext';
import testimonialsServices from '@/services/testimonialsServices';

const TestimonialForm = ({ isEdit }) => {
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const {
    values,
    setValues,
    handleChange,
    resetForm,
    getFormData,
    purify,
    isSubmitting,
    setIsSubmitting,
  } = useFormContext();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id: testimonialId } = useParams();

  const queryParams = { username: 'john_doe' }; // Contoh parameter username
  const {
    data: testimonial,
    // eslint-disable-next-line
    error,
    // eslint-disable-next-line
    isLoading,
  } = useSWR(
    queryParams ? ['/testimonials', queryParams] : null,
    // eslint-disable-next-line
    ([url, params]) => testimonialsServices.fetchTestimonialByParam(params)
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(values);

    setIsSubmitting(true);

    const sanitizedData = {
      foto_profile: values.foto_profile,
      name: purify.sanitize(values.name),
      title: purify.sanitize(values.title),
      message: purify.sanitize(values.message),
    };

    const formData = getFormData();
    Object.keys(sanitizedData).forEach((key) =>
      formData.append(key, sanitizedData[key])
    );
    try {
      if (isEdit) {
        await testimonialsServices.updateTestimonialById(
          token,
          testimonialId,
          sanitizedData
        );
      } else {
        await testimonialsServices.addTestimonial(token, sanitizedData);
      }
      resetForm();
      navigate('/dashboard/testimonials');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewPhoto(URL.createObjectURL(file));
      handleChange(event);
    }
  };

  useEffect(() => {
    if (testimonial) {
      setValues({
        foto_profile: null,
        name: testimonial?.name,
        title: testimonial?.title,
        message: testimonial?.message,
      });
    }
  }, [testimonial, setValues]);

  return (
    <div className="mx-auto w-full max-w-lg p-4">
      <Typography as="h1" variant="subHeading">
        {isEdit ? 'Edit Testimonial' : 'Add New Testimonial'}
      </Typography>
      <form onSubmit={onSubmit}>
        <div className="space-y-6">
          <FormItem>
            <Label htmlFor="banner">Profile Photo</Label>
            {previewPhoto && (
              <div>
                <img
                  alt="Preview Banner"
                  className="mx-auto"
                  src={previewPhoto}
                  width="20%"
                />
              </div>
            )}
            <Input
              accept="image/*"
              id="banner"
              name="banner"
              type="file"
              onChange={handleFileChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter title"
              type="text"
              value={values.title || ''}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter name"
              type="name"
              value={values.name || ''}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="title">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter message"
              type="message"
              value={values.message || ''}
              onChange={handleChange}
            />
          </FormItem>

          <Button
            className={`w-full ${isSubmitting ? 'animate-pulse' : ''}`}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Submitting...' : isEdit ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

TestimonialForm.propTypes = {
  isEdit: PropTypes.bool,
};

const TestimonialsForm = ({ isEdit = false }) => {
  return (
    <FormProvider isMultipart>
      <TestimonialForm isEdit={isEdit} />
    </FormProvider>
  );
};

TestimonialsForm.propTypes = {
  isEdit: PropTypes.bool,
};

export default TestimonialsForm;
