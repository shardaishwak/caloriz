import React from "react";

import { Text, View } from "react-native";
import colors from "../../colors";
import { AntDesign } from "@expo/vector-icons";

const TopNotch = ({ food_name }) => (
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
    <AntDesign name="staro" size={20} />
  </View>
);

export default TopNotch;
