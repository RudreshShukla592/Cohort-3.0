import { useForm } from "react-hook-form";
import {useNavigate} from "react-router"
import { useDispatch } from "react-redux";
import { loginAction } from "../store/authAction";

export const useAuth = () => {

  let navigate = useNavigate()  
  let dispatch= useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onRegisterSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const onLoginSubmit = (data) => {

    dispatch(loginAction(data))

    reset()
  };

  return {
    register,
    handleSubmit,
    errors,
    watch,
    onLoginSubmit,
    onRegisterSubmit,
    navigate,
  };
};
