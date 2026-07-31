import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { AuthShop } from "./AuthContext";
import { useMemo } from "react";

export const MainShop = createContext();

export const MainProvider = ({ children }) => {
  let { currentUser } = useContext(AuthShop);

  const [allSongs, setAllSongs] = useState([]);
  const [librarySongs, setLibrarySongs] = useState([]);
  const [uploadedSongs, setUploadedSongs] = useState(
    JSON.parse(localStorage.getItem("uploadedSongs")) || [],
  );
  const [apiSongs, setApiSongs] = useState([]);

  const searchTerms = [
    "pop",
    "bollywood",
    "arijit singh",
    "ed sheeran",
    "weeknd",
    "taylor swift",
    "hip hop",
    "rock",
    "punjabi",
    "lofi",
  ];

  let getMusicData = async () => {
    try {
      const requests = searchTerms.map((term) =>
        axiosInstance.get("/search", {
          params: {
            term,
            entity: "song",
            limit: 10,
          },
        }),
      );

      const responses = await Promise.all(requests);

      let songs = responses.flatMap((res) => res.data.results);

      // Remove duplicates
      songs = [...new Map(songs.map((song) => [song.trackId, song])).values()];

      // Shuffle
      songs.sort(() => Math.random() - 0.5);

      setApiSongs(songs);
      setLibrarySongs(songs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAllSongs([...apiSongs, ...uploadedSongs]);
  }, [apiSongs, uploadedSongs]);

  useEffect(() => {
    getMusicData();
  }, []);

  const [favouriteSongs, setFavouriteSongs] = useState(
    currentUser?.favouriteSongs || [],
  );

  useEffect(() => {
    setFavouriteSongs(currentUser?.favouriteSongs || []);
  }, [currentUser]);

  const mySongs = useMemo(() => {
    return uploadedSongs.filter((song) => song.artistId === currentUser.id);
  }, [uploadedSongs, currentUser]);

  return (
    <MainShop.Provider
      value={{
        allSongs,
        setAllSongs,
        getMusicData,
        favouriteSongs,
        setFavouriteSongs,
        uploadedSongs,
        setUploadedSongs,
        librarySongs,
        setLibrarySongs,
        mySongs
      }}
    >
      {children}
    </MainShop.Provider>
  );
};
