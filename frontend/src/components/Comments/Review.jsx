const Review = props => {
  return (
    <div>
      <div>{props.createdAt}</div>
      <div>{props.title}</div>
      <div>{props.createdAt}</div>
      <div>{props.comment}</div>
    </div>
  );
};

export default Review;
