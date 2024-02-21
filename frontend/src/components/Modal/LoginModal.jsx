import LoginPage from "../../pages/Login.jsx";
import Modal from "./Modal.jsx";

const LoginModal = props => {
  return (
    <Modal
      header="Hello!"
      footer="Still not registered? It's fast and easy!"
      onCancel={props.onCancel}
      show
    >
      <LoginPage />
    </Modal>
  );
};

export default LoginModal;
