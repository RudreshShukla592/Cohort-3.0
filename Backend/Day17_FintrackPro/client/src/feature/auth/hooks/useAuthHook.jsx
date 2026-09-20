import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useApi from "../api/authApi";
import { useContext } from "react";
import { MyStore } from "../../../app/context/MyContext";

export const useAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const api = useApi();

  const { setAccessToken, setUser, setLoading } = useContext(MyStore);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onRegisterSubmit = async (data) => {
    console.log("Register Data:", data);

    try {
      const response = await api.post("/auth/register", data);

      console.log(response.data.accessToken);
      setAccessToken(response.data.accessToken);
      setUser(response.data.data.user);
      setLoading(false);

      navigate("/home");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onLoginSubmit = async (data) => {
    console.log("Login Data:", data);

    try {
      const response = await api.post("/auth/login",data)

      setAccessToken(response.data.accessToken);
      setUser(response.data.data.user);
      setLoading(false);

      navigate("/home");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onRegisterSubmit,
    navigate,
    onLoginSubmit,
  };
};
