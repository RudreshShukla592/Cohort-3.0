import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const useAuth = () => {
  let navigate = useNavigate();

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

  const loginForm = (data) => {
    console.log(data);
    
    reset();
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
