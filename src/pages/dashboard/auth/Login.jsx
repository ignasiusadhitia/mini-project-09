import { useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Logo } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox'; // Gunakan komponen ShadCN
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormProvider, useFormContext } from '@/context/FormContext';
import authService from '@/services/authServices';
import { loginSuccess } from '@/store/features/authSlice';

const LoginForm = () => {
  const { values, handleChange, purify } = useFormContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckboxChange = useCallback(
    (checked) => {
      handleChange({
        target: {
          name: 'remember_me',
          value: checked,
        },
      });
    },
    [handleChange]
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    const purifiedData = {
      email: purify.sanitize(values.email),
      password: purify.sanitize(values.password),
      remember_me: values.remember_me,
    };
    try {
      const response = await authService.login(purifiedData);
      const { token } = response;
      dispatch(loginSuccess(token));
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-4 rounded-lg bg-white p-12 md:w-96"
      onSubmit={onSubmit}
    >
      <Logo className="mx-auto mb-8" />
      <div className="flex items-center space-x-2">
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={values?.email || ''}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={values?.password || ''}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          checked={values.remember_me || false}
          id="remember_me"
          name="remember_me"
          onCheckedChange={handleCheckboxChange}
        />
        <Label className="text-[0.9rem]" htmlFor="remember_me">
          Remember Me
        </Label>
      </div>

      <Button className="mt-4 w-full" type="submit">
        Login
      </Button>
    </form>
  );
};

const Login = () => {
  return (
    <div className="bg-front-primary flex h-screen w-full items-center justify-center px-4">
      <FormProvider>
        <LoginForm />
      </FormProvider>
    </div>
  );
};

export default Login;
