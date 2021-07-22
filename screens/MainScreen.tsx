import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGlobal } from "../global/provider";
import Header from "../components/Header";
import Card from "../components/Card";
import NewItemButton from "../components/NewItemButton";
import colors from "../colors";
import Progress from "../components/Progress";

const MainScreen = (props) => {
  const { state } = useGlobal();

  const target = 2000;
  const current = 1684;

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
        <Card title="Breakfast" t_kcal={290} t_p={19.6} t_c={0.5} t_f={12}>
          <Text>Breakfast data</Text>
        </Card>
      </ScrollView>
      <NewItemButton navigation={props.navigation} />
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
