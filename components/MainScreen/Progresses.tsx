/**
 * The progress circle bars of the carbohydrates, fat and caories
 * The data is taken from the main state
 */
import React from "react";

import { ScrollView, StyleSheet, View } from "react-native";
import colors from "../../colors";
import Progress from "./Progress";

const Progresses = ({ progress_data, total_calories }) => {
  const user_mass = 55; // add it to state;
  const total_fat_to_consume = (total_calories * 60.5) / 2000;
  const total_protein_to_consume = user_mass * 1; // based on total_calories_daily consumption
  const total_carbs_to_consume = (total_calories * 275) / 2000; // based on total_calories_daily/8;

  // 0.4g per mass is the prescribed journal fat
  const fat_perc = Math.round((100 * progress_data.fat) / total_fat_to_consume);
  // 2000:275 = calories : carbohydrates
  const carb_perc = Math.round(
    (100 * progress_data.fat) / total_carbs_to_consume
  );
  // 3000:60.5 = calroeis: fat
  const protein_perc = Math.round(
    (100 * progress_data.fat) / total_protein_to_consume
  );
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Progress
          percent={carb_perc > 100 ? 100 : carb_perc}
          title={"Carbs"}
          color={colors.app.purple_100}
          value={
            (total_carbs_to_consume > progress_data.carbohydrates
              ? (total_carbs_to_consume - progress_data.carbohydrates).toFixed(
                  1
                )
              : 0) + "g"
          }
        />
        <Progress
          percent={fat_perc > 100 ? 100 : fat_perc}
          title={"Fat"}
          color={colors.app.orange_100}
          value={
            (total_fat_to_consume > progress_data.fat
              ? (total_fat_to_consume - progress_data.fat).toFixed(1)
              : 0) + "g"
          }
        />
        <Progress
          percent={protein_perc > 100 ? 100 : protein_perc}
          title={"Protein"}
          color={colors.app.blue_100}
          value={
            (total_protein_to_consume > progress_data.protein
              ? (total_protein_to_consume - progress_data.protein).toFixed(1)
              : 0) + "g"
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
    marginBottom: 40,
  },
});

export default Progresses;
