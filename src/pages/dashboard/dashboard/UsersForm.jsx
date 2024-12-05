import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@/components/commons';
import { Button } from '@/components/ui/button';
import { FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormProvider, useFormContext } from '@/context/FormContext';
import usersServices from '@/services/usersServices';

const AddUserForm = () => {
  const {
    values,
    handleChange,
    getFormData,
    resetForm,
    purify,
    isSubmitting,
    setIsSubmitting,
  } = useFormContext();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const sanitizedData = {
      photo: values.photo,
      name: purify.sanitize(values.name),
      title: purify.sanitize(values.title),
      email: purify.sanitize(values.email),
      username: purify.sanitize(values.username),
      password: purify.sanitize(values.password),
      linkedin_url: purify.sanitize(values.linkedin_url),
      ig_url: purify.sanitize(values.ig_url),
    };

    const formData = getFormData();
    Object.keys(sanitizedData).forEach((key) =>
      formData.append(key, sanitizedData[key])
    );

    try {
      await usersServices.addUser(token, sanitizedData);
      resetForm();
      navigate('/dashboard/users');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg p-4">
      <Typography as="h1" variant="subHeading">
        Add New User
      </Typography>
      <form onSubmit={onSubmit}>
        <div className="space-y-6">
          <FormItem>
            <Label htmlFor="photo">Photo</Label>

            <Input
              accept="image/*"
              id="photo"
              name="photo"
              type="file"
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter name"
              type="text"
              value={values.name || ''}
              onChange={handleChange}
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter email"
              type="email"
              value={values.email || ''}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter username"
              type="text"
              value={values.username || ''}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter password"
              type="password"
              value={values.password || ''}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
            <Input
              id="linkedin_url"
              name="linkedin_url"
              placeholder="Enter linkedin_url"
              type="text"
              value={values.linkedin_url || ''}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="ig_url">Instagram URL</Label>
            <Input
              id="ig_url"
              name="ig_url"
              placeholder="Enter ig_url"
              type="text"
              value={values.ig_url || ''}
              onChange={handleChange}
            />
          </FormItem>

          <Button
            className={`w-full ${isSubmitting ? 'animate-pulse' : ''}`}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Submitting...' : 'Add User'}
          </Button>
        </div>
      </form>
    </div>
  );
};

const UsersForm = () => {
  return (
    <FormProvider isMultipart>
      <AddUserForm />
    </FormProvider>
  );
};

export default UsersForm;
