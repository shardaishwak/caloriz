import React from "react";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const Progress = ({
  percent,
  value,
  title,
}: {
  percent: number;
  value: number;
  title: string;
}) => {
  return (
    <View style={{ marginRight: 10, alignItems: "center", marginLeft: 10 }}>
      <AnimatedCircularProgress
        size={60}
        width={7}
        backgroundWidth={5}
        fill={percent}
        tintColor="#212121"
        tintColorSecondary="#eee"
        backgroundColor="#eee"
        arcSweepAngle={240}
        rotation={240}
        lineCap="round"
      >
        {() => <Text>{value}</Text>}
      </AnimatedCircularProgress>
      <Text>{title}</Text>
    </View>
  );
};

export default Progress;
