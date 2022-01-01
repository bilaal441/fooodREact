import classes from "./Modal.module.css";
import reactDom from "react-dom";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModaOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const overLayEl = document.getElementById("overLays");
const Modal = (props) => {
  return (
    <>
      {reactDom.createPortal(<Backdrop onClose={props.onClose} />, overLayEl)}
      {reactDom.createPortal(
        <ModaOverlay>{props.children}</ModaOverlay>,
        overLayEl
      )}
    </>
  );
};

export default Modal;
