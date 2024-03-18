import { Link } from "react-router-dom";

import styles from "./FavsCartDropdown.module.css";

const FavsCartDropdown = props => {
  const items = props.items;

  return (
    <ul
      className={`${styles.container} ${
        props.cart ? styles["cart-position"] : styles["favs-position"]
      }`}
    >
      {items.length > 0 ? (
        items.map(item => (
          <Link key={item.id} to={`/products/${item.id}`}>
            <li>
              <span className={styles["image-wrapper"]}>
                <img
                  src={`data:${item.imageType};base64, ${item.image}`}
                  alt={props.name}
                />
              </span>
              <span className={styles.name}>{item.name}</span>
              {props.cart && (
                <span className={styles.qty}>x{item.quantity}</span>
              )}
              <span className={styles.price}>${item.price}</span>
            </li>
          </Link>
        ))
      ) : (
        <span className={styles["no-favs"]}>
          {`You have not ${
            props.cart ? "added any items to your cart" : "saved any favourites"
          } so far.`}
        </span>
      )}
    </ul>
  );
};

export default FavsCartDropdown;

// const FavsDropdown = props => {
//   const favs = props.favs;

//   return (
//     <ul className={styles.container}>
//       {favs.length > 0 ? (
//         favs.map(fav => (
//           <Link key={fav.id} to={`/products/${fav.id}`}>
//             <li>
//               <span className={styles["image-wrapper"]}>
//                 <img
//                   src={`data:${fav.imageType};base64, ${fav.image}`}
//                   alt={props.name}
//                 />
//               </span>
//               <span className={styles.name}>{fav.name}</span>
//               <span className={styles.price}>${fav.price}</span>
//             </li>
//           </Link>
//         ))
//       ) : (
//         <span className={styles["no-favs"]}>
//           You have not saved any favourites so far.
//         </span>
//       )}
//     </ul>
//   );
// };

// export default FavsDropdown;
