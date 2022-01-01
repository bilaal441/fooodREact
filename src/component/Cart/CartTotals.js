import classes from "./CartTotals.module.css";

const CartTotals = (props) => {
  return (
    <div className={classes.total}>
      <span>Total Amount</span>
      <span> {props.totalAmount}</span>
    </div>
  );
};

export default CartTotals;
