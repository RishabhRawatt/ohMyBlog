import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

//this component to make login component (not login page !)
// we used react hook form

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useform give 2 parameters
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  // a function which login the user if exist it will store the data to redux store and redirect
  const login = async (data) => {
    setError("");
    try {
      // check if already logged in
      const session = await authService.login(data);
      if (session) {
        // if exist then get current userdata
        const userData = await authService.getCurrentUser();
        if (userData)
          //put in store (authlogin is store login)
          dispatch(authLogin(userData));
        //redirect to home
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {/* this form will always use its own handleSubmit (which is method who input another method)
        where you can provide your method  */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              //what this ...register do is take all values form the form
              //   (if we dont use ... it will overwrite)
              // cause we want those state in another our custom components
              // key : value
              {...register("email", {
                required: true,
                validate: {
                  //this is regex to check valid email
                  // / (your regex between / /) / .test(on what value you want to test) || else error message
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
