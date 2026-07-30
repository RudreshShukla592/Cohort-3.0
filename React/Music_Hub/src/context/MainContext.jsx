import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { AuthShop } from "./AuthContext";

export const MainShop = createContext();

export const MainProvider = ({ children }) => {

  let {currentUser} = useContext(AuthShop)

  const [allSongs, setAllSongs] = useState([]);

  let getMusicData = async () => {
    try {
      let res = await axiosInstance.get("/search", {
        params: {
          term: "pop", // or "bollywood", "arijit", etc.
          entity: "song",
          limit: 100,
        },
      });
      setAllSongs(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const [favouriteSongs, setFavouriteSongs] = useState(
    currentUser?.favouriteSongs || [],
  );

  useEffect(()=>{
    setFavouriteSongs(currentUser?.favouriteSongs || [])
  },[currentUser])
 

  return (
    <MainShop.Provider
      value={{
        allSongs,
        setAllSongs,
        getMusicData,
        favouriteSongs,
        setFavouriteSongs,
       
      }}
    >
      {children}
    </MainShop.Provider>
  );
};
