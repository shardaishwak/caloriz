import React from "react";

import { Text, View } from "react-native";
import colors from "../../../colors";
import FavouriteIcon from "../../FavouriteIcon";
import { StyleSheet } from "react-native";

/**
 * The informative area of the modal
 * Contains: item title and favourite button
 */
const TopNotch = ({ food_name, calories, onStarClick }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: 20, height: 20 }}></View>
      <Text style={styles.title}>{food_name}</Text>
      <FavouriteIcon
        onClick={onStarClick}
        food_name={food_name}
        calories={calories}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  title: {
    fontFamily: "Inter-Semibold",
    fontSize: 25,
    color: colors.app.dark_600,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export default TopNotch;
