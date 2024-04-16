export const saveCartToLocalStorage = items => {
  const localStoreItems = items.map(item => {
    return {
      id: item.id,
      image: item.image,
      imageType: item.imageType,
      name: item.name,
      quantity: item.quantity
    };
  });
  const stringifiedItems = JSON.stringify(localStoreItems);
  localStorage.setItem("items", stringifiedItems);
};

export const getFullInfo = async items => {
  const itemIdsArr = items.map(item => {
    return item.id;
  });

  const itemIdsStr = itemIdsArr.join("_");

  const response = await fetch(`http://web.lvh.me/api/products/store/${itemIdsStr}`);
  let productsInfo = await response.json();
  productsInfo = productsInfo.products;

  items = items.map(item => {
    return Object.assign(item, productsInfo.filter(newItem => item.id === newItem.id)[0]);
  });

  return items;
};

export const saveFavsToLocalStorage = favs => {
  const stringifiedItems = JSON.stringify(favs);
  localStorage.setItem("favs", stringifiedItems);
};
