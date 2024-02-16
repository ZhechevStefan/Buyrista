export const prepareCartToSend = cartItems => {
  const productsIdsAndCount = [];
  cartItems.map(item => {
    const current = { id: item.id, count: item.quantity };
    productsIdsAndCount.push(current);
  });

  return productsIdsAndCount;
};

export const prepareFavsToSend = favs => {
  console.log(favs);
  const productsIds = [];
  favs.map(fav => productsIds.push(fav.id));

  return productsIds;
};

export const fetchCartChange = async (method, productsIdsAndCount) => {
  const response = await fetch("http://localhost:5000/users/cart", {
    method: method,
    credentials: "include",
    body: JSON.stringify({ productsIdsAndCount })
  });

  const data = JSON.parse(response);
  return data;
};
