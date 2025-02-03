import { ID } from "appwrite";
import { account } from "../lib/appwrite.ts";
import { useState } from "react";
import signupsvg from "../assets/images/signup.svg";
import { toast } from "react-toastify";
import Button from "../components/Button.tsx";
import Label from "../components/Label.tsx";
import Input from "../components/Input.tsx";

function Signup() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.password.length < 8) {
      toast.error("Password must be 8 length", { autoClose: 1000 });
    }
    try {
      const user = await account.create(
        ID.unique(),
        userData.email,
        userData.password,
      );
      if (user) {
        toast.success("Account create success", { autoClose: 1000 });
      }
    } catch (err: any) {
      if (err.code === 400) {
        toast.error("Enter Valid Email", { autoClose: 1000 });
      }
      if (err.code === 429) {
        toast.error("Too many request, Try after sometime", {
          autoClose: 1000,
        });
      }
      console.log("Error: ", err.code);
    }
  };
  return (
    <>
      <div className="login w-full min-h-screen flex justify-center items-center bg-blue-gray overflow-hidden">
        <div className="login-form mt-20 w-full bg-white max-w-6xl flex flex-col md:flex-row justify-between items-center shadow-xl rounded-3xl p-4">
          {/* Register form left side */}
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <form
              onSubmit={handleSignup}
              className="flex flex-col space-y-4 border-2 bg-white border-light-gray shadow-xl rounded-3xl"
            >
              <div className="flex w-full p-1 justify-start shadow-md mt-2">
                <h1 className="text-[32px] ml-5 font-canvet text-coral-pink font-bold">
                  Register
                </h1>
              </div>
              <div className="px-4 flex flex-col">
                <Label labelName="Username" className="" />
                <Input
                  type="text"
                  id="username"
                  name="username"
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  placeholder="Choose a username"
                  className="shadow-md bg-white"
                  required
                />
              </div>

              <div className=" px-4 flex flex-col">
                <Label labelName="Password" className="" />
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  placeholder="Create your password"
                  className="shadow-md"
                  required
                />
              </div>
              <div className="p-4">
                <Button
                  label="Signup"
                  disabled={false}
                  className="w-1/3 shadow-md p-3 bg-yellow-500 bg-lime-green text-white rounded-lg hover:bg-dark-green"
                />
              </div>
            </form>
          </div>
          {/* register right side code */}
          <div className="h-auto w-full flex justify-center items-center relative md:w-1/2 p-4">
            <img
              src={signupsvg}
              alt="login side image"
              className="w-full z-10 transform-3d h-auto max-w-[500px] mx-auto"
            />
            <div className="ml-36 mb-24 scale-110 rounded-full absolute opacity-40 bg-navy-blue -skew-y-12 w-4/5 h-4/5"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
