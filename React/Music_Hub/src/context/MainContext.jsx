import { createContext, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";


export const MainShop = createContext()

export const MainProvider = ({children})=>{

    const [allSongs, setAllSongs] = useState([])

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

    return <MainShop.Provider value={{allSongs, setAllSongs, getMusicData}}>{children}</MainShop.Provider>
}