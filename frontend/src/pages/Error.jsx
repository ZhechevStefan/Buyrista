import { useRouteError } from "react-router-dom";
import Header from "../components/Header/Header.jsx";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = error.message;

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <Header />
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </>
  );
}

export default ErrorPage;
