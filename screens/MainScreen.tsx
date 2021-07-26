import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { useGlobal } from "../global/provider";
import { todayDate } from "../global/actions";
import { AppDate, CommonItem } from "../interface";

import NewItemButton from "../components/NewItemButton";
import Progress from "../components/Progress";
import Header from "../components/Header";
import Card from "../components/Card";

import colors from "../colors";

const MainScreen = (props) => {
  const { state } = useGlobal();

  const target = 2000;
  const current = 1684;

  const today_data = state.data[todayDate()] as AppDate;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        />
      </ScrollView>
      <NewItemButton navigation={props.navigation} />
    </SafeAreaView>
  );
};

const RenderCards = ({ cards_to_show, today_data }) => (
  <View>
    {cards_to_show.map((a) => {
      let total_calories = 0;
      let total_fat = 0;
      let total_protein = 0;
      let total_sugar = 0;

      today_data[a].forEach((a: CommonItem) => {
        total_calories += a.calories * a.quantity;
        total_fat += a.fat * a.quantity;
        total_protein += a.protein * a.quantity;
        total_sugar += a.sugars * a.quantity;
      });
      console.log(total_calories);
      return (
        <Card
          title={a}
          t_kcal={total_calories}
          t_p={total_fat}
          t_c={total_protein}
          t_f={total_sugar}
        >
          <Text>{a} data</Text>
        </Card>
      );
    })}
  </View>
);

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
