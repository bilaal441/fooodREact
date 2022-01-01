import React, {useContext, useEffect, useState} from "react";

import classes from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/cart-context";

const HeaderCartButton = (props) => {
  const cartctx = useContext(CartContext);
  const {items} = cartctx;
  const [btnIHighLighted, setBtnIHighLighted] = useState(false);

  const numOfCartItems = items?.reduce((occ, cur) => occ + cur.amount, 0);
  const btnClasses = `${classes.button} ${btnIHighLighted ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIHighLighted(true);
    const timer = setTimeout(() => {
      setBtnIHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
