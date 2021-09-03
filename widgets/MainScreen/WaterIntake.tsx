import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import colors from "../../colors";
import { Gender } from "../../interface";
import { useRootDispatch, useRootState } from "../../store";
import dateConsumptionAction from "../../store/actions/dateConsumption.action";

const WaterIntake: React.FC<{}> = () => {
  const gender = useRootState((state) => state.profile.gender);
  const intake = useRootState((state) => state.dateConsumption.water.cup_qty);
  const dispatch = useRootDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const recommended_intake_cup = gender === Gender.male ? 15.5 : 11.5;
  const recommended_intake_litre = gender === Gender.male ? 3.7 : 2.7;

  const total_cups_perc = (intake / recommended_intake_cup) * 100;
  const total_cups_to_litre =
    (recommended_intake_litre * intake) / recommended_intake_cup;

  const litre_to_millilitre = Math.round(total_cups_to_litre * 1000);

  const onPress = async () => {
    setLoading(true);
    await dispatch(dateConsumptionAction.AddWaterCup());
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Drinking</Text>
      <LinearGradient
        colors={["#51ace2", "#5a69be"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ borderRadius: 25 }}
      >
        <View style={{ alignItems: "center", paddingVertical: 25 }}>
          <View style={styles.wrapper}>
            <AnimatedCircularProgress
              size={200}
              width={7}
              backgroundWidth={5}
              fill={total_cups_perc > 100 ? 100 : total_cups_perc}
              tintColor={"#8df8ff"}
              backgroundColor={"rgba(114,249,243,.5)"}
              lineCap="round"
              rotation={0}
            >
              {() => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={styles.small_text}>Today's intake</Text>
                  <Text style={styles.qty}>{litre_to_millilitre}</Text>
                  <Text style={styles.small_text}>
                    of {recommended_intake_litre * 1000}ml
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
          <TouchableWithoutFeedback onPress={loading ? null : onPress}>
            <View style={styles.btn_container}>
              {loading ? (
                <View style={styles.row_center}>
                  <ActivityIndicator size={18} color={"3682aa"} />
                  <Text style={[styles.btn_text, { marginLeft: 10 }]}>
                    adding
                  </Text>
                </View>
              ) : (
                <Text style={styles.btn_text}>drink</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 20, marginVertical: 20 },
  label: {
    fontSize: 15,
    color: colors.app.dark_300,
    fontFamily: "Inter-Medium",
    textAlign: "center",
    marginBottom: 20,
  },
  wrapper: {
    width: 240,
    height: 240,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,.1)",
  },
  small_text: {
    color: "rgba(255,255,255,.5)",
    fontFamily: "Inter",
  },
  qty: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Inter-Medium",
  },
  btn_container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "#73f9f3",
    borderRadius: 999,
  },
  row_center: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btn_text: {
    textTransform: "uppercase",
    fontFamily: "Inter",
    letterSpacing: 5,
    color: "#3682aa",
  },
});

export default WaterIntake;
