import React, {useContext, useState} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import cartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import CartAction from "./CartAction";
import OrderForm from "./ordermeal/Order";

const Cart = (props) => {
  const [isOrder, setIsOrder] = useState(false);
  const cartCtx = useContext(cartContext);

  const {items, totalAmount: amount, addItem, removeItem} = cartCtx;
  const totalAmount = `$${Math.max(amount, 0)?.toFixed(2)}`;
  const hasitems = items?.length > 0;

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    addItem({...item});
  };

  const orderHandler = () => {
    setIsOrder(true);
  };

  const onResetOrder = () => setIsOrder(false);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {hasitems &&
        items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
    </ul>
  );

  const totals = <CartTotals totalAmount={totalAmount} />;
  const actions = (
    <CartAction
      onClose={props.onClose}
      hasitems={hasitems}
      onOrder={orderHandler}
    />
  );
  const content = isOrder ? (
    <OrderForm onOrder={onResetOrder} />
  ) : (
    <>
      {cartItems}
      {totals}
      {actions}
    </>
  );
  return <Modal onClose={props.onClose}>{content}</Modal>;
};

export default Cart;
