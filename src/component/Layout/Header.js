import React, {Fragment} from "react";
import mealsImg from "../../Assets/meals.jpg";
import classes from "./Header.module.css";
import HearCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HearCartButton onShowCart={props.onShowCart} />
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="A table full of food" />
      </div>
    </Fragment>
  );
};

export default Header;
