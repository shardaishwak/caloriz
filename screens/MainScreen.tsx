import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { REMOVE_FOOD, useGlobal } from "../global/provider";
import { todayDate } from "../global/actions";
import { AppDate, CommonItem, Fields } from "../interface";

import NewItemButton from "../components/NewItemButton";
import Progress from "../components/Progress";
import Header from "../components/Header";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";

import colors from "../colors";
import db from "../global/db";

const MainScreen = (props) => {
  const { state } = useGlobal();
  // default, pass it from the main screen as the user takes a new date
  const date = todayDate();
  const date_data = (state.data[date] as AppDate) || [];

  let target = 7000;
  let current = 0;

  // Retrive data of a prticular date from state

  const progress_data = {
    carbohydrates: 0,
    fat: 0,
    protein: 0,
  };

  Fields.map((field) => {
    date_data[field].forEach((item: CommonItem) => {
      progress_data.fat += item.fat * item.quantity;
      progress_data.carbohydrates = item.carbohydrates * item.quantity;
      progress_data.protein += item.protein * item.quantity;
      current += item.calories * item.quantity;
    });
  });
  console.log(progress_data);

  const user_mass = 55; // add it to state;
  const total_fat_to_consume = user_mass * 0.4;
  const total_protein_to_consume = user_mass * 0.8;
  const total_carbs_to_consume = user_mass * 0.5;

  // 0.4g per mass is the prescribed journal fat
  const fat_perc = Math.round((100 * progress_data.fat) / total_fat_to_consume);
  // 0.5g per mass is the prescribed journal fat
  const carb_perc = Math.round(
    (100 * progress_data.fat) / total_carbs_to_consume
  );
  // 0.8g per mass is the prescribed journal fat
  const protein_perc = Math.round(
    (100 * progress_data.fat) / total_protein_to_consume
  );

  console.log(fat_perc, carb_perc, protein_perc);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header navigation={props.navigation} />
        <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Inter",
              color: colors.app.dark_300,
            }}
          >
            Calories left
          </Text>
          <Text
            style={{
              fontSize: 45,
              fontFamily: "Inter",
              color: colors.app.dark_500,
            }}
          >
            <Text style={{ fontFamily: "Inter-Bold" }}>
              {(target - current)
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>{" "}
            kcal
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginVertical: 10,
            marginBottom: 40,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Progress
              percent={carb_perc > 100 ? 100 : carb_perc}
              title={"Carbs"}
              color={colors.app.purple_100}
              value={
                (total_carbs_to_consume > progress_data.carbohydrates
                  ? (
                      total_carbs_to_consume - progress_data.carbohydrates
                    ).toFixed(1)
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
                  ? (total_protein_to_consume - progress_data.protein).toFixed(
                      1
                    )
                  : 0) + "g"
              }
            />
          </ScrollView>
        </View>
        <RenderCards
          sessions={["breakfast", "lunch"]}
          date_data={date_data}
          navigation={props.navigation}
          date={date}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const RenderCards = ({ sessions, date_data, navigation, date }) => (
  <View>
    {sessions.map((session) => {
      let total_calories = 0;
      let total_fat = 0;
      let total_protein = 0;
      let total_sugar = 0;

      const session_data = date_data[session];
      console.log(date_data);

      date_data[session]?.forEach((item: CommonItem) => {
        total_calories += item.calories * item.quantity;
        total_fat += item.fat * item.quantity;
        total_protein += item.protein * item.quantity;
        total_sugar += item.sugars * item.quantity;
      });
      return (
        <Card
          title={session}
          t_kcal={total_calories}
          t_p={total_fat}
          t_c={total_protein}
          t_f={total_sugar}
          key={session}
          session={session}
          navigation={navigation}
        >
          {session_data.map((item: CommonItem) => (
            <Item
              food_name={item.food_name}
              calories={item.calories}
              fat={item.fat}
              sugar={item.sugars}
              protein={item.protein}
              id={item.id}
              session={session}
              date={date}
              key={item.id as string}
            />
          ))}
          {/*<AddButton session={session} navigation={navigation} />*/}
        </Card>
      );
    })}
  </View>
);
// replace [a] with [session]

const Item = ({
  food_name,
  id,
  session,
  date,
  calories,
  sugar,
  protein,
  fat,
}: {
  food_name: string;
  id: string | number | number[];
  session: string;
  date: string;
  calories: number;
  sugar: number;
  protein: number;
  fat: number;
}) => {
  const { state, dispatch } = useGlobal();
  const deleteItem = async () => {
    await db.deleteItem(state, date, session, id);
    dispatch({ type: REMOVE_FOOD, payload: { date, field: session, id } });
  };
  return (
    <View style={{ marginVertical: 10 }}>
      <Text
        style={{
          fontFamily: "Inter-Medium",
          fontSize: 17,
          textTransform: "capitalize",
          color: colors.app.dark_500,
        }}
      >
        {food_name}
      </Text>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 7.5,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: colors.app.dark_300,
              fontSize: 12,
              marginRight: 15,
            }}
          >
            {calories}kcal
          </Text>
          <Text
            style={{
              color: colors.app.dark_300,
              fontSize: 12,
              marginRight: 15,
            }}
          >
            {protein}g
          </Text>
          <Text
            style={{
              color: colors.app.dark_300,
              fontSize: 12,
              marginRight: 15,
            }}
          >
            {sugar}g
          </Text>
          <Text style={{ color: colors.app.dark_300, fontSize: 12 }}>
            {fat}g
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={deleteItem}>
          <Ionicons name="close" size={20} color={colors.app.dark_300} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const AddButton = ({ navigation, session }) => {
  return (
    <View style={{ marginTop: 20, marginBottom: 0 }}>
      <Pressable
        onPress={() =>
          navigation.navigate("newitem", {
            session,
          })
        }
      >
        <View
          style={{
            borderColor: colors.app.green_100,
            borderWidth: 1,
            borderRadius: 7.5,
            paddingVertical: 7.5,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter-Medium",
              color: colors.app.green_100,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Add Food
          </Text>
        </View>
      </Pressable>
    </View>
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
