const Comment = props => {
  <div>
    <div>{props.title}</div>
    <div>{props.createdAt}</div>
    <div>{props.comment}</div>
  </div>;
};

export default Comment;
