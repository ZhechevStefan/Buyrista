const AdminRoute = ({ children }) => {
  let storedUser = localStorage.getItem("userInfo");

  if (!storedUser.isAdmin) {
    throw new Response("Sorry, this page is for admins only!", { stauts: 403 });
  }

  return children;
};

export default AdminRoute;
