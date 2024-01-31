import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Notifications = props => {
  return (
    <div>
      <ToastContainer
        className="toast-position"
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
        limit={3}
      />
    </div>
  );
};

export default Notifications;
