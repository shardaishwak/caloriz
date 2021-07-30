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

import { useGlobal } from "../global/provider";
import { todayDate } from "../global/actions";
import { AppDate, CommonItem } from "../interface";

import NewItemButton from "../components/NewItemButton";
import Progress from "../components/Progress";
import Header from "../components/Header";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";

import colors from "../colors";
import { StackActionHelpers } from "@react-navigation/native";

const MainScreen = (props) => {
  const { state } = useGlobal();

  const target = 2000;
  const current = 1684;

  const today_data = (state.data[todayDate()] as AppDate) || [];

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
              {current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Text>{" "}
            kcal
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 10,
            marginBottom: 40,
          }}
        >
          <Progress
            percent={65}
            title={"Carbs"}
            color={colors.app.purple_100}
            value={"70g"}
          />
          <Progress
            percent={26}
            title={"Fat"}
            color={colors.app.orange_100}
            value={"26g"}
          />
          <Progress
            percent={58}
            title={"Protein"}
            color={colors.app.blue_100}
            value={"58g"}
          />
        </View>
        <RenderCards
          cards_to_show={["breakfast", "lunch"]}
          today_data={today_data}
          navigation={props.navigation}
        />
      </ScrollView>
      <NewItemButton navigation={props.navigation} />
    </SafeAreaView>
  );
};

const RenderCards = ({ cards_to_show, today_data, navigation }) => (
  <View>
    {cards_to_show.map((a) => {
      let total_calories = 0;
      let total_fat = 0;
      let total_protein = 0;
      let total_sugar = 0;

      today_data[a]?.forEach((a: CommonItem) => {
        total_calories += a.calories * a.quantity;
        total_fat += a.fat * a.quantity;
        total_protein += a.protein * a.quantity;
        total_sugar += a.sugars * a.quantity;
      });
      return (
        <Card
          title={a}
          t_kcal={total_calories}
          t_p={total_fat}
          t_c={total_protein}
          t_f={total_sugar}
          key={a}
        >
          <Item
            food_name="Eggs"
            calories={300}
            fat={23.4}
            sugar={0.6}
            protein={3.8}
          />
          <AddButton session={a} navigation={navigation} />
        </Card>
      );
    })}
  </View>
);

const Item = ({
  food_name,
  calories,
  sugar,
  protein,
  fat,
}: {
  food_name: string;
  calories: number;
  sugar: number;
  protein: number;
  fat: number;
}) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text
        style={{
          fontFamily: "Inter-Medium",
          fontSize: 15,
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
        <TouchableWithoutFeedback>
          <Ionicons name="close" size={20} color={colors.app.dark_300} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const AddButton = ({ navigation, session }) => {
  return (
    <View style={{ marginTop: 10, marginBottom: 0 }}>
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
