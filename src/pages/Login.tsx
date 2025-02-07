import { useEffect, useState } from 'react';
import { account } from '../lib/appwrite';
import { useDispatch, useSelector } from 'react-redux';
import { signinFailure, signinStart, signinSuccess } from '../redux/slices/userSlice';
import loginsvg from '../assets/images/login-svg.svg';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';
import { RootState } from '../redux/store/store';
import { Hourglass } from 'react-loader-spinner';

function Login() {
  const loading = useSelector((state: RootState) => state.user.isLoading);
  const currentSession = useSelector(
    (state: RootState) => state.user.cookieFallback,
  );
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ email: '', password: '' });
  const Navigate = useNavigate();
  useEffect(() => {
    console.log('Current session', currentSession);
    if (currentSession) {
      Navigate('/booklist');
      console.log(currentSession);
    } else Navigate('/login');
  }, [currentSession]);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signinStart());
    if (userData.password.length < 8) {
      toast.error('Password must be 8');
    }
    try {
      const user = await account.createEmailPasswordSession(
        userData.email,
        userData.password,
      );

      if (user) {
        dispatch(
          signinSuccess({
            currentUser: user.providerUid,
          }),
        );
        toast.success('Login', { autoClose: 1000 });
        console.log(currentSession);

        Navigate('/booklist');
      }
    } catch (err: any) {
      if (err.code === 400) {
        toast.error('Enter Valid Email', { autoClose: 1000 });
      }
      if (err.code === 401) {
        toast.error('Unauthorized Access', { autoClose: 1000 });
      }
      if (err.code === 429) {
        toast.error('Too many request, Try after sometime', {
          autoClose: 1000,
        });
      }
      console.log('Error: ', err);
      dispatch(
        signinFailure()
      )
    }
  };

  return (
    <>
      {/* login container */}
      {!loading ? (
        <div className="login w-full min-h-screen flex justify-center items-center bg-blue-gray overflow-hidden">
          <div className="login-form w-full mt-20 max-w-6xl bg-white flex flex-col md:flex-row justify-between items-center shadow-xl rounded-3xl  p-4">
            {/* Register form right side */}
            <div className="h-auto w-full flex justify-center items-center relative md:w-1/2 p-4">
              <img
                src={loginsvg}
                alt="login side image"
                className="w-full z-10 transform-3d h-auto max-w-[500px] mx-auto"
              />
              <div className="mr-36 mt-24 scale-125 rounded-full absolute opacity-70 bg-coral-pink skew-y-12 w-4/5 h-4/5"></div>
            </div>

            {/* Login form left side */}
            <div className="flex flex-col w-full md:w-1/2 p-4">
              <form
                onSubmit={handleLogin}
                className="flex flex-col space-y-4 border-2 bg-white border-light-gray shadow-xl rounded-3xl">
                <div className="flex w-full p-1 justify-start shadow-md mt-2">
                  <h1 className="text-[32px] ml-5 font-canvet text-coral-pink font-bold">
                    Login
                  </h1>
                </div>
                <div className="p-2 flex flex-col">
                  <Label labelName="Username" className="" />

                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="shadow-md"
                    required
                  />
                </div>

                <div className=" p-2 flex flex-col">
                  <Label labelName="Password" className="" />
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    className="shadow-md"
                    required
                  />
                </div>
                <div className="px-4 py-1">
                  <Button
                    label="Login"
                    disabled={false}
                    className="mb-2 w-1/3 shadow-md p-3 bg-yellow-500 bg-lime-green text-white rounded-lg hover:bg-dark-green"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen opacity-50 flex flex-col justify-center items-center">
          <Hourglass />
        </div>
      )}
    </>
  );
}

export default Login;
