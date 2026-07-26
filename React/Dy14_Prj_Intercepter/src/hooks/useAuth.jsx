import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";

export const useAuth = () => {
  let { setLoggedUser, registerUser, setRegisterUser } = useContext(MyShop);

  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  //   login form logic
  let loginFormData = (data) => {
    let user = registerUser.find(
      (user) => user.email === data.email && user.password === data.password,
    );

    if (!user) {
      alert("user not found or invalid credentials");
      reset();
      return;
    }

    setLoggedUser(user);
    localStorage.setItem("loggedUserr", JSON.stringify(user));
    alert("user loggedIn");
    navigate("/main");
    reset();
  };

  //   register form logic
  let registerFormData = (data) => {
    let arr = [...registerUser, data];
    setRegisterUser(arr);
    alert("Registration done");
    localStorage.setItem("registerUser", JSON.stringify(arr));
    navigate("/main");
    reset();
  };

  return {
    navigate,
    register,
    handleSubmit,
    errors,
    loginFormData,
    registerFormData,
  };
};
