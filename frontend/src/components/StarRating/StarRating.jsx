import { useState } from "react";
import { Rating } from "react-simple-star-rating";

function StarRating(props) {
  const initialValue = props.initialValue;
  const readOnly = props.readOnly;
  const allowFraction = props.allowFraction ?? true;

  const [rating, setRating] = useState(initialValue || 0);

  // Catch Rating value
  const handleRating = rate => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  //   const onPointerEnter = () => console.log("Enter");
  //   const onPointerLeave = () => console.log("Leave");
  //   const onPointerMove = (value, index) => console.log(value, index);

  return (
    <div className="star-rating">
      <Rating
        onClick={handleRating}
        initialValue={initialValue}
        readonly={readOnly}
        allowFraction={allowFraction}
        size={16}
        fillStyle={{ color: "yellow" }}
        // style={{ color: "#f1a545" }}
        // onPointerEnter={onPointerEnter}
        // onPointerLeave={onPointerLeave}
        // onPointerMove={onPointerMove}
      />
    </div>
  );
}

export default StarRating;
