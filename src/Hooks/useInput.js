import {useReducer} from "react";

const intialState = {
  value: "",
  isTouch: false,
};

const inputReducer = (state, action) => {
  if (action.type === "USER_ENTERED_VALUE")
    return {value: action.payLoad.val, isTouch: state.isTouch};

  if (action.type === "BLUR") return {value: state.value, isTouch: true};
  if (action.type === "reset") return intialState;
  return state;
};

const UseInput = (validate) => {
  const [inputState, dispatch] = useReducer(inputReducer, intialState);
  const isValid = validate(inputState.value);
  const hasError = !isValid && inputState.isTouch;

  const inputChangeHandler = (e) =>
    dispatch({
      type: "USER_ENTERED_VALUE",
      payLoad: {
        val: e.target.value,
      },
    });

  const inputBlurHandler = (e) =>
    dispatch({
      type: "BLUR",
    });

  const reset = () => {
    dispatch({
      type: "reset",
    });
  };

  return {
    val: inputState.value,
    onBlur: inputBlurHandler,
    onChange: inputChangeHandler,
    isValid,
    hasError,
    reset: reset,
  };
};

export default UseInput;
