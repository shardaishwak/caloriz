import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { NEW_DATE_LOADING, REMOVE_FOOD, useGlobal } from "../global/provider";
import { AppDate, CommonItem, FoodNutrients, Session } from "../interface";

import Progress from "../components/MainScreen/Progress";
import Header from "../components/Header";
import Card from "../components/MainScreen/Card";
import { Ionicons } from "@expo/vector-icons";

import colors from "../colors";
import db from "../global/db";
import {
  daysInMonth,
  extract_data_from_date,
  formatted_get_week_of_date,
  todayDate,
  transform_week_to_string,
} from "../time";
import { LoadData } from "../cache";
import Carousel from "react-native-snap-carousel";
import Dater from "../components/MainScreen/Dater";
import Calorimeter from "../components/MainScreen/Calorimeter";
import Progresses from "../components/MainScreen/Progresses";
import RenderSessionCards from "../components/MainScreen/RenderSessionCards";

const MainScreen = (props) => {
  const {
    state: { data },
  } = useGlobal();
  // default, pass it from the main screen as the user takes a new date
  const date_data = data;

  let target = 3000;

  // Retrive data of a prticular date from state

  /**
   * Loop throught all the daily cosumption to add up the interested values to show
   * The current total calories are also calculated
   */
  const fixed_sessions: Array<Session> = [
    Session.breakfast,
    Session.dessert,
    Session.dinner,
    Session.extra,
    Session.lunch,
    Session.second_breakfast,
    Session.snack,
  ];

  const progress_data = GET_TOTAL_NUTRIENTS(date_data, fixed_sessions);

  /**
   * Create a date list for the particular month and year
   */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header navigation={props.navigation} />

        <Dater />
        <Calorimeter target={target} current={progress_data.calories} />
        <Progresses progress_data={progress_data} total_calories={target} />
        <RenderSessionCards
          sessions={[
            Session.breakfast,
            Session.second_breakfast,
            Session.lunch,
            Session.snack,
            Session.dinner,
            Session.extra,
          ]} // All the card sessions to show
          date_data={date_data} // Current state date based data
          navigation={props.navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  wrapper: {
    flexDirection: "row",
    marginBottom: 15,
  },
  counter: {
    fontSize: 50,
    fontFamily: "Inter",
  },
});

/**
 * Calulcation of the total consumption of the nutrients
 */

const GET_TOTAL_NUTRIENTS = (data, sessions) => {
  const progress_data: FoodNutrients = {
    carbohydrates: 0,
    fat: 0,
    protein: 0,
    sugars: 0,
    cholesterol: 0,
    potassium: 0,
    sodium: 0,
    dietary_fiber: 0,
    saturated_fat: 0,
    calories: 0,
  };

  sessions.map((field) => {
    data[field].forEach((item: CommonItem) => {
      progress_data.fat += item.fat * item.quantity;
      progress_data.carbohydrates = item.carbohydrates * item.quantity;
      progress_data.protein += item.protein * item.quantity;
      progress_data.sugars += item.sugars * item.quantity;
      progress_data.cholesterol += item.cholesterol * item.quantity;
      progress_data.potassium += item.potassium * item.quantity;
      progress_data.sodium += item.sodium * item.quantity;
      progress_data.dietary_fiber += item.dietary_fiber * item.quantity;
      progress_data.calories += item.calories * item.quantity;
    });
  });
  return progress_data;
};

export default MainScreen;
