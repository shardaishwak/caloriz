import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Constants from "expo-constants";

import db from "../global/db";
import { useGlobal } from "../global/provider";

import { Entypo } from "@expo/vector-icons";

import { CommonItem, FoodNutrients, Session } from "../interface";

import Header from "../components/Header";

import Onboarding from "../widgets/Onboarding";
import Dater from "../widgets/MainScreen/Dater";
import Progresses from "../widgets/MainScreen/Progresses";
import Calorimeter from "../widgets/MainScreen/Calorimeter";
import RenderSessionCards from "../widgets/MainScreen/RenderSessionCards";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

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

const MainScreen = ({ navigation }: { navigation: StackNavigationHelpers }) => {
  const {
    state: { data, profile },
  } = useGlobal();
  // default, pass it from the main screen as the user takes a new date
  const date_data = data;

  let target = profile.calories_target; // TODO: bring to state as user.preferences.target

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          goBack={false}
          navigation={navigation}
          rightIcon={
            <TouchableWithoutFeedback
              onPress={() => navigation.push("settings:profile")}
            >
              <Entypo name="cog" size={25} />
            </TouchableWithoutFeedback>
          }
        />
        <Dater />
        <Calorimeter target={target} current={progress_data.calories} />
        <Progresses progress_data={progress_data} />
        <RenderSessionCards
          sessions={fixed_sessions} // All the card sessions to show
          date_data={date_data} // Current state date based data
          navigation={navigation}
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
