import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useGlobal } from "../global/provider";

/**
 * componet for managing on favourite click
 * Add the component to add the star
 */
const FavouriteIcon = ({ food_name, calories, onClick }) => {
  const {
    state: { favourites },
  } = useGlobal();
  const isActive = () =>
    favourites.findIndex(
      (a) => a.food_name === food_name && a.calories === calories
    ) < 0
      ? false
      : true;
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <AntDesign name={isActive() ? "star" : "staro"} size={20} />
    </TouchableWithoutFeedback>
  );
};

export default FavouriteIcon;
