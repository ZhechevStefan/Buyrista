import Input from "../Input/Input.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import useForm from "../../hooks/form-hook.jsx";
import { VALIDATOR_MAXLENGTH } from "../../util/validators.js";
import Button from "../Button/Button.jsx";

const WriteAReview = () => {
  const [formState, inputChangeHandler] = useForm(
    {
      title: {
        value: "",
        isValid: true
      },
      comment: {
        value: "",
        isValid: true
      }
    },
    true
  );

  return (
    <>
      <div>Write a Customer Review</div>
      <StarRating readOnly={false} allowFraction={false} />
      <Input
        id="title"
        label="Title"
        rows="1"
        onChange={inputChangeHandler}
        validators={[VALIDATOR_MAXLENGTH(50)]}
      />
      <Input
        id="comment"
        label="Comment"
        onChange={inputChangeHandler}
        validators={[VALIDATOR_MAXLENGTH(50)]}
      />
      <Button>Save</Button>
    </>
  );
};

export default WriteAReview;
