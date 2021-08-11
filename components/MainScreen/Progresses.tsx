/**
 * The progress circle bars of the carbohydrates, fat and caories
 * The data is taken from the main state
 */
import React from "react";

import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import colors from "../../colors";
import { FoodNutrients } from "../../interface";
import Progress from "./Progress";

class Progresses extends React.Component<{
  progress_data: FoodNutrients;
  total_calories: number;
}> {
  carousel;
  _renderItem = ({ item: { perc, total_consume, pd, title, color } }) => (
    <Progress
      percent={perc > 100 ? 100 : perc}
      title={title}
      color={color}
      value={(total_consume > pd ? (total_consume - pd).toFixed(1) : 0) + "g"}
    />
  );
  render() {
    const { progress_data, total_calories } = this.props;
    const user_mass = 55; // add it to state;

    const total_fat_to_consume = (total_calories * 60.5) / 2000;
    const total_protein_to_consume = user_mass * 1; // based on total_calories_daily consumption
    const total_carbs_to_consume = (total_calories * 275) / 2000; // based on total_calories_daily/8;
    const total_sugar_to_consume = 37.5; // 25 for women
    const total_cholesterol_to_consume = 0.3;
    // add other fields

    // FAT : 0.4g per mass is the prescribed journal fat
    const fat_perc = Math.round(
      (100 * progress_data.fat) / total_fat_to_consume
    );
    // CARBOHYDRATES: 2000:275 = calories : carbohydrates
    const carb_perc = Math.round(
      (100 * progress_data.fat) / total_carbs_to_consume
    );
    // PROTEIN: 3000:60.5 = calroeis: fat
    const protein_perc = Math.round(
      (100 * progress_data.fat) / total_protein_to_consume
    );
    // SUGARS
    const sugar_perc = Math.round(
      (100 * progress_data.sugars) / total_sugar_to_consume
    );
    // CHOLESTEROL
    const chol_perc = Math.round(
      (100 * progress_data.cholesterol) / total_cholesterol_to_consume
    );

    const DATA = [
      {
        perc: carb_perc,
        title: "carbs",
        color: colors.app.purple_100,
        total_consume: total_carbs_to_consume,
        pd: progress_data.carbohydrates,
      },
      {
        perc: fat_perc,
        title: "fat",
        color: colors.app.orange_100,
        total_consume: total_fat_to_consume,
        pd: progress_data.fat,
      },
      {
        perc: protein_perc,
        title: "protein",
        color: colors.app.blue_100,
        total_consume: total_protein_to_consume,
        pd: progress_data.protein,
      },
      {
        perc: sugar_perc,
        title: "sugars",
        color: colors.tailwind.red._500,
        total_consume: total_sugar_to_consume,
        pd: progress_data.sugars,
      },
      {
        perc: chol_perc,
        title: "Choles",
        color: colors.tailwind.pink._500,
        total_consume: total_cholesterol_to_consume,
        pd: progress_data.cholesterol,
      },
    ];
    return (
      <View style={styles.container}>
        <Carousel
          layout={"default"}
          firstItem={1}
          ref={(ref) => (this.carousel = ref)}
          data={DATA}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={125}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginBottom: 40,
  },
});

export default Progresses;
