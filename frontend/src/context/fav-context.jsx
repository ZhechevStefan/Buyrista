import { createContext } from "react";

const FavContext = createContext({
  favs: [],
  addFav: item => {},
  removeFav: id => {},
  clearFavs: () => {},
  getFavs: userID => {},
  checkIfFav: id => {}
});

export default FavContext;
