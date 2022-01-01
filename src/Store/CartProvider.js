import {useReducer} from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const delItem = (state, action) =>
  state.items.filter((item) => !item.id.includes(action.id));

const findExistingIndex = (state, id) => {
  return state.items.findIndex((item) => item.id === id);
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotal =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItem =
      state.items[findExistingIndex(state, action.item.id)];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[findExistingIndex(state, action.item.id)] = updatedItem;
    } else updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedItems;
    const existingCartItem = state.items[findExistingIndex(state, action.id)];
    const totalAmount =
      state.items.length > 0 ? state.totalAmount - existingCartItem.price : 0;

    if (existingCartItem.amount === 1) updatedItems = delItem(state, action);
    else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[findExistingIndex(state, action.id)] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: totalAmount,
    };
  }

  if (action.type === "RESET") return defaultCartState;
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: "ADD_ITEM", item: item});
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({type: "REMOVE_ITEM", id: id});
  };
  const resetCart = () => dispatchCartAction({type: "RESET"});

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    reset: resetCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
