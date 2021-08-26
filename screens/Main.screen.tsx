import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Constants from "expo-constants";

import db from "../global/db";
import { useGlobal } from "../global/provider";
import { SET_FIRST_TIME } from "../global/constraints";

import { CommonItem, FirstTime, FoodNutrients, Session } from "../interface";

import Header from "../components/Header";

import Onboarding from "../widgets/Onboarding";
import Dater from "../widgets/MainScreen/Dater";
import Progresses from "../widgets/MainScreen/Progresses";
import Calorimeter from "../widgets/MainScreen/Calorimeter";
import RenderSessionCards from "../widgets/MainScreen/RenderSessionCards";

/**
 * Calulcation of the total consumption of the nutrients
 */

const GET_TOTAL_NUTRIENTS = (data, sessions) => {
  console.log(Constants.manifest.version);
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

const MainScreen = (props: { navigation }) => {
  const {
    state: { data, first_time },
    dispatch,
  } = useGlobal();
  // default, pass it from the main screen as the user takes a new date
  const date_data = data;

  let target = 3000; // TODO: bring to state as user.preferences.target

  // Retrive data of a prticular date from state

  /**
   * Loop throught all the daily cosumption to add up the interested values to show
   * The current total calories are also calculated
   */
  const fixed_sessions: Array<Session> = [
    Session.breakfast,
    Session.second_breakfast,
    Session.lunch,
    Session.snack,
    Session.dinner,
    Session.dessert,
    Session.extra,
  ];

  // All the collection of daily consumptions
  const progress_data = GET_TOTAL_NUTRIENTS(date_data, fixed_sessions);

  /**
   * Add the first time fields to the db and state as user is not new anymore
   * Called after the card click
   */
  const ADD_FIRST_TIME = async () => {
    const values: FirstTime = {
      created_at: new Date(),
      value: false,
      version: Constants.manifest.version,
    };
    db.setFirstTime(values);
    dispatch({ type: SET_FIRST_TIME, payload: values });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!first_time.value && !first_time.created_at && (
        <Onboarding onClose={ADD_FIRST_TIME} />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header goBack={false} navigation={props.navigation} />

        <Dater />
        <Calorimeter target={target} current={progress_data.calories} />
        <Progresses progress_data={progress_data} total_calories={target} />
        <RenderSessionCards
          sessions={fixed_sessions} // All the card sessions to show
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

export default MainScreen;
