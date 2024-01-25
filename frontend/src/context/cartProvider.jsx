import { useEffect, useReducer, useRef } from "react";
import CartContext from "./cart-context.jsx";

import { saveToLocalStorage, getFullInfo } from "../utils/localStorageUtils.js";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //update the total sum for the products in the cart
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;

    //search if the product is already in the cart
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    //update the cart
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
        countInStock: existingCartItem.countInStock - action.item.quantity
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    //save to Local Storage
    saveToLocalStorage(updatedItems);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === "REMOVE") {
    //search for the index of the product in the cart
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    //update the total sum
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    //search if the product still has quantity or should be removed from cart
    let updatedItems;
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
        countInStock: existingItem.countInStock + 1
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    //save to local Storage
    saveToLocalStorage(updatedItems);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === "CLEAR") {
    localStorage.clear();
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  const fetchStopper = useRef(true);

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem("items"));

    const getAndSetPriceAndCountInStock = async items => {
      items = await getFullInfo(items);
      items.map(item => {
        addItemToCartHandler({ ...item });
      });
    };

    if (items && items.length > 0) {
      if (fetchStopper.current) {
        getAndSetPriceAndCountInStock(items);
        return () => {
          fetchStopper.current = false;
        };
      }
    }
  }, []);

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
