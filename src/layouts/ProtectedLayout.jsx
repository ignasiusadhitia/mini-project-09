import React from 'react';

import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

ProtectedLayout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedLayout;
