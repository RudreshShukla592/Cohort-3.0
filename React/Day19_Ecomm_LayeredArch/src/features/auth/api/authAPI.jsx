import { api } from "../../../config/api";

export const loginUserApi = async (credentails) => {
  try {
    let res = await api.post("/auth/login", credentails);
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
};

export const hydrateUser = async () => {
  let token = localStorage.getItem("accessToken");

  try {
    let res = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
      },
    });
    console.log("Hydration res", res);

    return res.data;
  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
};
