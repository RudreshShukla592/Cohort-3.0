import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginUserAPI } from "../api/authAPI";
import { addUser } from "../state/authSlice";
import { toast } from "react-toastify";
import { loginUserAction } from "../state/authActions";

export const useAuthHook = () => {
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

  const loginForm =(data) => {
    try {
      dispatch(loginUserAction(data))
      
    } catch (error) {
      console.log(error);   
    }
    reset();
  };

  return {
    register,
    handleSubmit,
    reset,
    errors,
    registerForm,
    loginForm,
    navigate,
  };
};
