import { Text, View } from "react-native";
import colors from "../../colors";
import React from "react";
import { StyleSheet } from "react-native";

/**
 * The state of the calories remained to consume
 * Calulated by substracting the total number of calories and the number of calories consumed
 */
const Calorimeter = ({
  target,
  current,
}: {
  target: number;
  current: number;
}) => {
  return (
    <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
      <Text style={styles.top_text}>Calories left</Text>
      <Text style={styles.calories}>
        <Text style={{ fontFamily: "Inter-Bold" }}>
          {(target - current)
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>{" "}
        kcal
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  top_text: {
    fontSize: 15,
    fontFamily: "Inter",
    color: colors.app.dark_300,
  },
  calories: {
    fontSize: 45,
    fontFamily: "Inter",
    color: colors.app.dark_500,
  },
});

export default Calorimeter;
