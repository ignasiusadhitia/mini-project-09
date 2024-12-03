import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '@store/features/authSlice';

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      Overview
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Overview;
