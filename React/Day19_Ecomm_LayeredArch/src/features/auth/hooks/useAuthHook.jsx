import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginUserApi } from "../api/authAPI";
import { useDispatch } from "react-redux";
import { addUser } from "../state/authSlice";
import { toast } from "react-toastify";

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
      let response = await loginUserApi(data);

      dispatch(addUser(response));

      toast.success("user logged in 🎉");
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
