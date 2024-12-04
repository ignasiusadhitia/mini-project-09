import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '@store/features/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulasi login
    if (username === 'admin' && password === 'admin123') {
      dispatch(login());
      localStorage.setItem('token', 'mock-token'); // Simpan token ke localStorage
      navigate('/dashboard'); // Redirect ke halaman admin setelah login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
};

export default Login;
