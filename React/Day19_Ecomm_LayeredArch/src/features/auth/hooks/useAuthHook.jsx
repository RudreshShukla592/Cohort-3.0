import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginUserApi } from "../api/authAPI";
import { useDispatch } from "react-redux";
import { addUser } from "../state/authSlice";

import { loginUserAction } from "../state/authAction";

export const useAuth = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const registerForm = (data) => {
    console.log(data);

    reset();
  };

  const loginForm = async (data) => {
    try {
      dispatch(loginUserAction(data))
    
    } catch (error) {
      console.log(error);
    }
  };

  return {
    navigate,
    register,
    handleSubmit,
    errors,
    loginForm,
    registerForm,
  };
};
