import React from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://food-order-app-63cc5-default-rtdb.firebaseio.com/meals.json "
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      // console.log(responseData);

      const loadedMeals = []; // with that we transform the fetched data

      for (let key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      // console.log(loadedMeals);
      setMeals(loadedMeals);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.error}>
        <p>{error} </p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
