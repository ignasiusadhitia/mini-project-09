import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import authService from '@/services/authServices';
import { logout } from '@store/features/authSlice';

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await authService.logout(token);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>
      Overview
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Overview;
