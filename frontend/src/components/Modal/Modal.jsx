import ReactDOM from "react-dom";

import Backdrop from "../Backdrop.jsx";
import styles from "./Modal.module.css";

const ModalOverlay = props => {
  const content = (
    <div className={`${styles.modal} ${props.className}`} style={props.style}>
      <header className={`${styles["modal__header"]} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <div className={`${styles["modal__content"]} ${props.content}`}>
        {props.children}
      </div>
      <footer className={`${styles["modal__footer"]} ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = props => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </>
  );
};

export default Modal;
