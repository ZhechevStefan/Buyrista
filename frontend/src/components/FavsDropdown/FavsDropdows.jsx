import { Link } from "react-router-dom";

import styles from "./FavsDropdown.module.css";

const FavsDropdown = props => {
  const favs = props.favs;

  return (
    <ul>
      {favs.map(fav => (
        <Link key={fav.id} to={`/products/${fav.id}`}>
          <li>{fav.name}</li>
        </Link>
      ))}
    </ul>
  );
};

export default FavsDropdown;
