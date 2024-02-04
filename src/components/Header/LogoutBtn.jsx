import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  // we handle logout click
  const logoutHandler = () => {
    //this return promise
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch(() => {
        console.log("error logout");
      });
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
