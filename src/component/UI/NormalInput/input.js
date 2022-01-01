import classes from "./Input.module.css";

const Input = (props) => {
  const inputClass = props.inValid
    ? `${classes["form-control"]}  ${classes.invalid}`
    : `${classes["form-control"]}`;
  return (
    <div className={inputClass}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />

      {props.inValid && <p className="error-text">{props.err}</p>}
    </div>
  );
};

export default Input;
