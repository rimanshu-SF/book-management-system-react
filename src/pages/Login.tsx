import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RootState } from '../redux/store/store';
import { Hourglass } from 'react-loader-spinner';
import { useGoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../services/api';
import { useCallback, useEffect } from 'react';
import {
  signinStart,
  signinSuccess,
  signinFailure,
} from '../redux/slices/userSlice';

function Login() {
  const { isLoading, currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/booklist');
  }, [currentUser, navigate]);

  const handleGoogleResponse = useCallback(async (authResult: any) => {
    try {
      // console.log('Auth Result:', authResult);

      if (!authResult?.code) throw new Error('Authentication failed');

      dispatch(signinStart());
      const response = await googleLogin(authResult.code); // Call API with code
      const { data } = response;

      const userObj = {
        name: data.user.name,
        email: data.user.email,
        token: data.token,
      };

      dispatch(signinSuccess(userObj));
      toast.success('Welcome back!', { autoClose: 1000 });
      navigate('/booklist');
    } catch (error: any) {
      console.error('Login Error:', error);

      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch(signinFailure(errorMessage));

      if (error.response?.status === 404) {
        toast.error('Please sign up first', { autoClose: 1000 });
        navigate('/signup');
      } else {
        toast.error(errorMessage, { autoClose: 1000 });
      }
    }
  }, [dispatch, navigate]);

  const googleLoginHandler = useGoogleLogin({
    onSuccess: handleGoogleResponse,
    onError: () => toast.error('Login failed', { autoClose: 1000 }),
    flow: 'auth-code', // This generates the code client-side
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 
      flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {isLoading ? (
        <div className="relative z-10">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            colors={['#ffffff', '#e5e7eb']}
          />
        </div>
      ) : (
        <div className="relative z-10 login bg-white/5 p-8 rounded-xl shadow-2xl 
          w-full max-w-md backdrop-blur-xl border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent 
            rounded-xl -z-10"></div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center 
            drop-shadow-md">
            Login
          </h1>

          <button
            onClick={() => googleLoginHandler()} // Trigger Google login
            disabled={isLoading}
            className="w-full bg-blue-600/90 text-white py-3 px-4 rounded-lg 
              hover:bg-blue-700/90 transition-all duration-300 disabled:bg-blue-300/90 
              flex items-center justify-center gap-2 backdrop-blur-sm 
              border border-white/10 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.67 0-8.58-3.893-8.58-8.68s3.91-8.68 8.58-8.68c2.213 0 3.927.867 5.12 2.133l2.187-2.187C17.967 1.867 15.507 0 12 0 5.373 0 0 5.373 0 12s5.373 12 12 12c3.573 0 6.893-1.867 8.813-4.747 1.693-2.347 1.88-5.453 1.313-8.133h-9.647z"
              />
            </svg>
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;