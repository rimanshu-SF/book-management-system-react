import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { account } from "../lib/appwrite";
import { toast } from "react-toastify";
import { Hourglass } from "react-loader-spinner";
import { RootState } from "../redux/store/store";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  useEffect(() => {
    if (user !== null) {
      console.log("User from Logout", user);
      (async () => {
        try {
          await account.deleteSessions();
          dispatch(logoutUser());
          toast.success("Logged out successfully", { autoClose: 1000 });
          navigate("/login");
        } catch (err) {
          console.error("Logout failed", err);
          toast.error("Something went wrong!", { autoClose: 1000 });
          navigate("/login");
        }
      })();
    } else {
      toast.error("Unauthorized Access", { autoClose: 1000 });
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-gray-300 opacity-50 flex flex-col justify-center items-center">
      <Hourglass />
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
