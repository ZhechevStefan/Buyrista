import { useRef, useState, useContext } from "react";

import FavContext from "./fav-context.jsx";
import { saveFavsToLocalStorage, getFullInfo } from "../utils/localStorageUtils.js";
import AuthContext from "./auth-context.jsx";

const FavProvider = props => {
  const [favs, setFavs] = useState([]);
  const authCtx = useContext(AuthContext);

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
    const response = await fetch(`http://web.lvh.me/api/users/${userID}`);
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

  // useEffect(() => {
  //   let favs = JSON.parse(localStorage.getItem("favs"));

  const getAndSetPriceAndCountInStock = async favsArr => {
    let favs = await getFullInfo(favsArr);

    favs.map(fav => {
      addFav({ ...fav });
    });
  };

  //   if (favs && favs.length > 0) {
  //     getAndSetPriceAndCountInStock(favs);
  //   }
  // }, []);

  const isInitial = useRef(true);

  if (authCtx.hasLoggedOut === false && isInitial.current) {
    isInitial.current = false;
    let items = JSON.parse(localStorage.getItem("items"));

    if (items && items.length > 0) {
      getAndSetPriceAndCountInStock(items);
    }
  }

  return <FavContext.Provider value={favContext}>{props.children}</FavContext.Provider>;
};

export default FavProvider;
