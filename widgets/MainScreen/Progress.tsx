import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import colors from "../../colors";

/**
 * @connect MainScreen
 * Circular progress bars
 */
const Progress = ({
  percent,
  title,
  color,
  value,
}: {
  percent: number;
  title: string;
  color: string;
  value: string;
}) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={35}
        width={4}
        backgroundWidth={4}
        fill={percent}
        tintColor={color}
        backgroundColor={colors.app.dark_100}
        lineCap="round"
        rotation={0}
      >
        {() => <Text></Text>}
      </AnimatedCircularProgress>
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value} left</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
    color: colors.app.dark_500,
    textTransform: "capitalize",
  },
  value: {
    fontFamily: "Inter",
    color: colors.app.dark_300,
    fontSize: 11,
  },
});

export default Progress;
