import Input from "../../UI/NormalInput/input";
import classes from "./Order.module.css";
import UseInput from "../../../Hooks/useInput";
import useHttp from "../../../Hooks/useHttp";
import {MEALS_URL as url} from "../../../config";
import {useContext} from "react";
import cartContext from "../../../Store/cart-context";
const inputText = (val) => val.trim() !== "";
const validateEmail = (val) => /\S+@\S+\.\S+/.test(val);
const valiadatePostCode = (val) =>
  /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i.test(val);

const OrderForm = (props) => {
  const {items, totalAmount, reset} = useContext(cartContext);
  const {SendRequest: sentOrder, error, isLoading} = useHttp();
  const SentOrderCallback = (data) => {
    console.log(data);
  };

  const {
    val: inputNameVal,
    onBlur: inputNameBlurHandler,
    onChange: inputNameChangeHandler,
    isValid: inputNameIsValid,
    hasError: inputNameHasError,

    reset: resetInputName,
  } = UseInput(inputText);
  const {
    val: inputEmailVal,
    onBlur: inputEmailBlurHandler,
    onChange: inputEmailChangeHandler,
    isValid: inputEmailIsValid,
    hasError: inputEmailHasError,
    reset: resetInputEmail,
  } = UseInput(validateEmail);
  const {
    val: inputAddressVal,
    onBlur: inputAddressBlurHandler,
    onChange: inputAddressChangeHandler,
    isValid: inputAddressIsValid,
    hasError: inputAddressHasError,
    reset: resetInputAddress,
  } = UseInput(inputText);

  const {
    val: inputPostcodeVal,
    onBlur: inputPostcodeBlurHandler,
    onChange: inputPostcodeChangeHandler,
    isValid: inputPostcodeIsValid,
    hasError: inputPostcodeHasError,
    reset: resetInputPostcode,
  } = UseInput(valiadatePostCode);

  const formIvalid =
    inputNameIsValid &&
    inputEmailIsValid &&
    inputAddressIsValid &&
    inputPostcodeIsValid
      ? true
      : false;

  const formSubmitionHandler = (e) => {
    e.preventDefault();
    if (!formIvalid) return;
    // console.log(inputNameVal, inputEmailVal, inputAddressVal, inputPostcodeVal);
    const customer = {
      Name: inputNameVal,
      Email: inputEmailVal,
      Address: `${inputAddressVal}  ${inputPostcodeVal}`,
    };

    sentOrder(
      {
        url: `${url}orders.json`,

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {order: {items, customer, totalAmount}},
      },
      SentOrderCallback
    );
    reset();

    resetInputName();
    resetInputEmail();
    resetInputAddress();
    resetInputPostcode();
    props.onOrder();
  };

  return (
    <form onSubmit={formSubmitionHandler}>
      <div className={classes["control-group"]}>
        <Input
          inValid={inputNameHasError}
          err={`input Name must not be emty`}
          label={"Name"}
          input={{
            onChange: inputNameChangeHandler,
            value: inputNameVal,
            onBlur: inputNameBlurHandler,
            type: "text",
            id: "Name",
          }}
        />
        <Input
          label={"E-Mail Address"}
          err={`Please enter a Valid Email`}
          inValid={inputEmailHasError}
          input={{
            onChange: inputEmailChangeHandler,
            value: inputEmailVal,
            onBlur: inputEmailBlurHandler,
            type: "email",
            id: "email",
          }}
        />
      </div>

      <div className={classes["control-group"]}>
        <Input
          label={"Address"}
          inValid={inputAddressHasError}
          err={"input adress must not be emty"}
          input={{
            onBlur: inputAddressBlurHandler,
            onChange: inputAddressChangeHandler,
            value: inputAddressVal,

            type: "text",
            id: "text",
          }}
        />
        <Input
          label={"Postcode"}
          inValid={inputPostcodeHasError}
          err={"Please enter a valid Postcode"}
          input={{
            value: inputPostcodeVal,
            onBlur: inputPostcodeBlurHandler,
            onChange: inputPostcodeChangeHandler,

            type: "text",
            id: "Postcode",
          }}
        />
      </div>

      <button type="submit" disabled={!formIvalid}>
        submit
      </button>
    </form>
  );
};

export default OrderForm;
