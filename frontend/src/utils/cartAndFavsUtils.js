export const prepareCartToSend = cartItems => {
  const productsIdsAndCount = [];
  cartItems.map(item => {
    const current = { productId: item.id, count: item.quantity };
    productsIdsAndCount.push(current);
  });

  return productsIdsAndCount;
};

export const prepareFavsToSend = favs => {
  const productsIds = [];
  favs.map(fav => productsIds.push(fav.id));

  return productsIds;
};
