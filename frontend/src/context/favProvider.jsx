import { useEffect, useState } from "react";

import FavContext from "./fav-context.jsx";
import {
  saveFavsToLocalStorage,
  getFullInfo
} from "../utils/localStorageUtils.js";

const FavProvider = props => {
  const [favs, setFavs] = useState([]);

  const addFav = item => {
    const existingFavIndex = favs.find(fav => fav.id === item.id);

    if (existingFavIndex) {
      return;
    }

    setFavs(state => {
      const newFavs = state.concat(item);
      saveFavsToLocalStorage(newFavs);
      return newFavs;
    });
  };

  const removeFav = productId => {
    const updatedFavs = favs.filter(fav => fav.id !== productId);

    setFavs(updatedFavs);
    saveFavsToLocalStorage(updatedFavs);
  };

  const clearFavs = () => {
    setFavs([]);
    localStorage.setItem("favs", null);
  };

  const getFavs = async userID => {
    const response = await fetch(`http://localhost:5000/users/${userID}`);
    let userFavs = await response.json();

    setFavs(state => {
      return [...state, userFavs];
    });
    saveFavsToLocalStorage(favs);
  };

  const checkIfFav = id => {
    return !!favs.find(fav => fav.id === id);
  };

  const favContext = {
    favs,
    addFav,
    removeFav,
    clearFavs,
    getFavs,
    checkIfFav
  };

  useEffect(() => {
    let favs = JSON.parse(localStorage.getItem("favs"));

    const getAndSetPriceAndCountInStock = async favsArr => {
      favs = await getFullInfo(favsArr);

      favs.map(fav => {
        addFav({ ...fav });
      });
    };

    if (favs && favs.length > 0) {
      getAndSetPriceAndCountInStock(favs);
    }
  }, []);

  return (
    <FavContext.Provider value={favContext}>
      {props.children}
    </FavContext.Provider>
  );
};

export default FavProvider;
