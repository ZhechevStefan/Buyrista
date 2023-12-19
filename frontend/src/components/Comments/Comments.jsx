import { useEffect, useState } from "react";

import Comment from "./Comment.jsx";

const Comments = props => {
  const productId = props.productId;
  const [loadedComments, setLoadedComments] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchComments = async productId => {
      try {
        const responseData = await fetch(
          `http://localhost:5000/products/comments/${productId}`
        );
        setLoadedComments(responseData.comments);
      } catch (err) {}
    };

    setIsLoading(true);
    fetchComments(productId);
    setIsLoading(false);
  }, [productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!loadedComments) {
    return (
      <div>
        There are still no comments for this product. You can be the first to
        write one!
      </div>
    );
  } else {
    {
      loadedComments.map(comment => {
        <Comment
          title={comment.title}
          createdAt={comment.createdAt}
          comment={comment.comment}
        />;
      });
    }
  }
};

export default Comments;
