import React, {useContext} from "react";
import cartContext from "../../../Store/cart-context";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const price = `$${props.price?.toFixed(2)}`;
  const cartCtx = useContext(cartContext);
  const {addItem} = cartCtx;
  const addCartHandler = (amount) => {
    console.log(amount, addItem);
    addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>

        <div className={classes.price}>{price}</div>
      </div>

      <div>
        <MealItemForm id={props.id} onAddToCart={addCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
