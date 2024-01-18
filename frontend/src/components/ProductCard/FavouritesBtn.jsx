import Button from "../Button/Button.jsx";

const FavouritesBtn = props => {
  <Button type="submit" disabled={!props.countInStock}>
    Add to Favourites
  </Button>;
};

export default FavouritesBtn;
