import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import colors from "../../colors";

/**
 * @connect MainScreen
 * Design of the main per session card
 *
 */
const Card = ({
  title,
  t_kcal,
  t_p,
  t_f,
  t_c,
  navigation,
  session,
  ...props
}: {
  title: string;
  children?: any;
  t_kcal: number;
  t_p: number;
  t_f: number;
  t_c: number;
  navigation: StackNavigationHelpers;
  session: string;
}) => {
  // Session card state
  const [open, setOpen] = useState<boolean>(false);

  const onPress = () =>
    navigation.navigate("newitem", {
      session,
    });

  return (
    <View style={styles.main_wrap}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
          <View>
            <View style={styles.center_justify}>
              <View style={styles.row_center}>
                <Ionicons
                  name={open ? "chevron-up" : "chevron-down"}
                  size={20}
                />
                <Text style={styles.title}>{title.split("_").join(" ")}</Text>
              </View>
              <Text style={styles.calories}>
                {t_kcal.toFixed(1)}{" "}
                <Text style={styles.calories_span}>kcal</Text>
              </Text>
            </View>

            <View style={[styles.center_justify, { marginTop: 10 }]}>
              <View style={styles.row_center}>
                <View style={styles.row_center}>
                  <View
                    style={[
                      styles.circle,
                      { borderColor: colors.app.orange_100 },
                    ]}
                  ></View>
                  <Text style={styles.circle_value}>{t_p.toFixed(1)}g</Text>
                </View>
                <View style={styles.row_center}>
                  <View
                    style={[
                      styles.circle,
                      { borderColor: colors.app.purple_100 },
                    ]}
                  ></View>
                  <Text style={styles.circle_value}>{t_f.toFixed(1)}g</Text>
                </View>
                <View style={styles.row_center}>
                  <View
                    style={[
                      styles.circle,
                      { borderColor: colors.app.blue_100 },
                    ]}
                  ></View>
                  <Text style={styles.circle_value}>{t_c.toFixed(1)}g</Text>
                </View>
              </View>
              <TouchableWithoutFeedback onPress={onPress}>
                <LinearGradient
                  colors={[
                    colors.tailwind.green._500,
                    colors.tailwind.green._600,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.button}
                >
                  <FontAwesome5 name="plus" size={17} color={"#fff"} />
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {open && <View style={styles.children}>{props.children}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_wrap: { margin: 20, marginBottom: 10, marginTop: 0 },
  row_center: { flexDirection: "row", alignItems: "center" },
  center_justify: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    padding: 20,
    borderColor: colors.app.dark_100,
    borderRadius: 25,
    borderWidth: 3,
    backgroundColor: "#fff",
  },
  children: {
    marginTop: 15,
    paddingTop: 5,
    borderTopWidth: 2,
    borderTopColor: colors.app.dark_100,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Medium",
    marginLeft: 10,
    color: colors.app.dark_600,
    textTransform: "capitalize",
  },
  calories: {
    fontFamily: "Inter-Medium",
    fontSize: 20,
    color: colors.app.dark_600,
  },
  calories_span: {
    fontFamily: "Inter",
    fontSize: 12,
    color: colors.tailwind.gray._400,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 3,
  },
  circle_value: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    color: colors.tailwind.gray._400,
    fontFamily: "Inter",
    fontSize: 15,
    marginRight: 5,
  },
  button: {
    width: 33,
    height: 33,
    backgroundColor: colors.app.green_200,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Card;
