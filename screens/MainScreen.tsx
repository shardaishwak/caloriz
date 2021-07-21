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
            style={{ fontSize: 18, fontFamily: "Inter", color: "#21212170" }}
          >
            Remaining to eat
          </Text>
          <Text
            style={{
              fontSize: 40,
              fontFamily: "Inter",
              color: "#212121",

              marginTop: 10,
            }}
          >
            <Text style={{ fontFamily: "Inter-Bold" }}>
              {current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Text>{" "}
            kcal
          </Text>
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
    paddingTop: Platform.OS === "android" ? 25 : 0,
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
