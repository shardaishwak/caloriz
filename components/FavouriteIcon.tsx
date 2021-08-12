import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";

import db from "../global/db";
import { REMOVE_FAVOURITE, useGlobal } from "../global/provider";

/**
 * componet for managing on favourite click
 * Add the component to add the star
 */
const FavouriteIcon = ({ food_name, calories, onClick }) => {
  const {
    state: { favourites },
    dispatch,
  } = useGlobal();
  const isActive = () =>
    favourites.findIndex(
      (a) => a.food_name === food_name && a.calories === calories
    ) < 0
      ? false
      : true;

  const removeFavourite = async () => {
    await db.removeFavourite(food_name, calories);
    dispatch({
      type: REMOVE_FAVOURITE,
      food_name: food_name,
      calories: calories,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={isActive() ? removeFavourite : onClick}>
      <AntDesign name={isActive() ? "star" : "staro"} size={20} />
    </TouchableWithoutFeedback>
  );
};

export default FavouriteIcon;
