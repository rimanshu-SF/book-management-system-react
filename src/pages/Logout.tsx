import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { Hourglass } from 'react-loader-spinner';
import { RootState } from '../redux/store/store';
import { googleLogout } from '@react-oauth/google';


const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  useEffect(() => {
    if (user !== null) {
      console.log("current user", user);
      
      if (user?.token) {
        googleLogout();
        dispatch(logoutUser());
        toast.success('Logged out successfully', { autoClose: 1000 });
        navigate('/login');
      }
    } else {
      toast.error('Unauthorized Access', { autoClose: 1000 });
      navigate('/');
    }
  });

  return (
    <div className="h-screen w-screen bg-gray-300 opacity-50 flex flex-col justify-center items-center">
      <Hourglass />
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
