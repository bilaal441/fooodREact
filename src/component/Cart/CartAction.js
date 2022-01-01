import classes from "./CartAction.module.css";

const CartAction = (props) => {
  return (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        close
      </button>
      {props.hasitems && (
        <button className={classes["button"]} onClick={props.onOrder}>
          Order
        </button>
      )}
    </div>
  );
};

export default CartAction;
