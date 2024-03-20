import { useRouteError } from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import Button from "../components/Button/Button.jsx";
import styles from "./Error.module.css";

function ErrorPage() {
  const error = useRouteError();

  let code = 500;
  let title = "An error occurred!";
  let message =
    "Sorry about that you can check our homepage while we repair everything.";

  if (error.status === 404) {
    code = 404;
    title = "Sorry, we couldn't find this page.";
    message =
      "But don't worry you can find plenty of other things on our homepage.";
  }

  return (
    <>
      <Header />
      <div className={styles["error-wrapper"]}>
        <h1>{code}</h1>
        <h2>{title}</h2>
        <p>{message}</p>
        <Button to="/">Back to Homepage</Button>
      </div>
    </>
  );
}

export default ErrorPage;
