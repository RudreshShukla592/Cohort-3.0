import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onRegisterSubmit = (data) => {
    console.log("Register Data:", data);
  };

   const onLoginSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onRegisterSubmit,
    navigate,
    onLoginSubmit
  };
};
