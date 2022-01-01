import React, {useRef, useState} from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [isValid, setIsValid] = useState(true);
  const amounInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const eneteredAmaunt = amounInputRef.current.value;
    const eneteredAmauntNum = +eneteredAmaunt;
    if (
      eneteredAmaunt.trim().length === 0 ||
      eneteredAmauntNum < 1 ||
      eneteredAmauntNum > 5
    ) {
      setIsValid(false);
      return;
    }

    props.onAddToCart(eneteredAmauntNum);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amounInputRef}
        label={"number"}
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          default: "1",
        }}
      />
      <button type="submit">+ add</button>
      {!isValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
