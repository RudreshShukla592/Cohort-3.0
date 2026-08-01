import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
  import {  toast } from 'react-toastify';
import {useDispatch} from "react-redux"
import { addUser } from "../features/authSlice";

export const useAuth = () => {
  let navigate = useNavigate();
  const [registeredUsers, setRegisteredUsers] = useState(
    JSON.parse(localStorage.getItem("registerdUsers")) || [],
  );

  let dispatch = useDispatch()

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const registerForm = (data) => {
    let arr = [...registeredUsers, data];
    setRegisteredUsers(arr);
    localStorage.setItem("registerdUsers", JSON.stringify(arr));
    toast.success("User Registered!!🎉")
    reset();
  };

  const loginForm = (data) => {
    let user = registeredUsers.find(
      (user) => user.email === data.email && user.password === data.password,
    );
    if (!user) {
       toast.error("Invalid Input❌")      
       reset()
       return 
    }
  
    dispatch(addUser(user))
    localStorage.setItem("loggedUser",JSON.stringify(user))
    toast.success("User Logged In!!🎉")

    reset();
  };

  return {
    navigate,
    register,
    handleSubmit,
    reset,
    errors,
    registerForm,
    loginForm,
  };
};
