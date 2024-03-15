import CartIcon from "../Cart/HeaderBtnIcon.jsx";

import styles from "./HeaderBtn.module.css";

const HeaderIconButton = props => {
  const { items, favs, img, alt, name } = props;

  let numberOfItems = null;
  if (items) {
    numberOfItems = props.items.reduce((cur, item) => {
      return cur + item.quantity;
    }, 0);
  } else {
    numberOfItems = favs.length;
  }

  return (
    <button onClick={props.onClick} className={`${styles["header-btn"]}`}>
      <CartIcon numberOfItems={numberOfItems} img={img} alt={alt} name={name} />
    </button>
  );
};

export default HeaderIconButton;
