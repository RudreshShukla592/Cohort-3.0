import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import useApi from "../api/useApi";

export const useAuth = () => {
  const { setAccessToken, setLoading, setUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const api = useApi();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);

      setAccessToken(res.data.data.accessToken);
      setUser(res.data.data.user);
      setLoading(false);

      navigate("/products");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      const res = await api.post("/auth/register", data);

      setUser(res.data.data.user);
      setLoading(false);

      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");

      setAccessToken(null);
      setUser(null);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    showPassword,
    setShowPassword,
    navigate,
    register,
    handleSubmit,
    errors,
    onLoginSubmit,
    watch,
    onRegisterSubmit,
    showConfirmPassword,
    setShowConfirmPassword,
    logout
  };
};
