import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";

import db from "../global@deprecated/db";
import { useRootDispatch, useRootState } from "../store";
import { cacheSlice } from "../store/reducers/cache.reducer";

/**
 * componet for managing on favourite click
 * Add the component to add the star
 */
const FavouriteIcon = ({ food_name, calories, onClick }) => {
  const favourites = useRootState((state) => state.cache.favourites);
  const dispatch = useRootDispatch();
  // Check if the item is present in the favourites list
  const isActive = () =>
    favourites.findIndex(
      (a) => a.food_name === food_name && a.calories === calories
    ) < 0
      ? false
      : true;

  // Remove the item from the favourite list
  const removeFavourite = async () => {
    await db.removeFavourite(food_name, calories);

    dispatch(
      cacheSlice.actions.removeFavouriteItem({
        food_name: food_name,
        calories: calories,
      })
    );
  };
  return (
    <TouchableWithoutFeedback onPress={isActive() ? removeFavourite : onClick}>
      <AntDesign name={isActive() ? "star" : "staro"} size={20} />
    </TouchableWithoutFeedback>
  );
};

export default FavouriteIcon;
