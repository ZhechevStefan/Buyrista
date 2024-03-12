import { Link } from "react-router-dom";

import styles from "./FavsDropdown.module.css";

const FavsDropdown = props => {
  const favs = props.favs;

  return (
    <ul className={styles.container}>
      {favs.map(fav => (
        <Link key={fav.id} to={`/products/${fav.id}`}>
          <li>
            <span className={styles["image-wrapper"]}>
              <img
                src={`data:${fav.imageType};base64, ${fav.image}`}
                alt={props.name}
              />
            </span>
            <span className={styles.name}>{fav.name}</span>
            <span className={styles.price}>${fav.price}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default FavsDropdown;
