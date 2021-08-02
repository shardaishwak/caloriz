import React from "react";

import { Text, TouchableWithoutFeedback, View } from "react-native";
import colors from "../../colors";
import { AntDesign } from "@expo/vector-icons";
import FavouriteIcon from "../FavouriteIcon";

const TopNotch = ({ food_name, calories, onStarClick }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <View style={{ width: 20, height: 20 }}></View>
      <Text
        style={{
          fontFamily: "Inter-Semibold",
          fontSize: 25,
          color: colors.app.dark_600,
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        {food_name}
      </Text>
      <FavouriteIcon
        onClick={onStarClick}
        food_name={food_name}
        calories={calories}
      />
    </View>
  );
};

export default TopNotch;
