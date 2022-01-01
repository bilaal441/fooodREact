import classes from "./AvailableMeals.module.css";
import Meals from "./MealItem/MealItem";
import Card from "../UI/Card";
import useHttp from "../../Hooks/useHttp";
import {MEALS_URL as url} from "../../config";
import {useEffect, useState, useCallback} from "react";

const AvailableMeals = () => {
  const {error, isLoading, SendRequest: fetchMeals} = useHttp();
  const [meals, setMeals] = useState([]);
  const applyData = useCallback(
    (data) => setMeals(data),

    [setMeals]
  );

  useEffect(() => {
    fetchMeals({url: `${url}meals.json`}, applyData);
  }, [fetchMeals, applyData]);

  const ContentHelper = (content = "loading...") => <p>{content}</p>;

  let content;

  if (isLoading) content = ContentHelper();

  if (error) content = ContentHelper(error);

  if (meals.length > 0)
    content = meals.map((item) => (
      <Meals
        key={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
        id={item.id}
      />
    ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
