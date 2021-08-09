import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import colors from "../../colors";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

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
  const [open, setOpen] = useState<boolean>(false);
  return (
    <View style={{ margin: 20, marginBottom: 10 }}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
          <View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Ionicons
                  name={open ? "chevron-up" : "chevron-down"}
                  size={20}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Inter-Medium",
                    marginLeft: 10,
                    color: colors.app.dark_600,
                    textTransform: "capitalize",
                  }}
                >
                  {title}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Inter-Medium",
                  fontSize: 20,
                  color: colors.app.dark_600,
                }}
              >
                {t_kcal.toFixed(1)}{" "}
                <Text
                  style={{
                    fontFamily: "Inter",
                    fontSize: 12,
                    color: colors.tailwind.gray._400,
                  }}
                >
                  kcal
                </Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      borderWidth: 3,
                      borderColor: colors.app.orange_100,
                    }}
                  ></View>
                  <Text
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      color: colors.tailwind.gray._400,
                      fontFamily: "Inter",
                      fontSize: 15,
                      marginRight: 5,
                    }}
                  >
                    {t_p.toFixed(1)}g
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      borderWidth: 3,
                      borderColor: colors.app.purple_100,
                    }}
                  ></View>
                  <Text
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      color: colors.tailwind.gray._400,
                      fontFamily: "Inter",
                      fontSize: 15,
                      marginRight: 5,
                    }}
                  >
                    {t_f.toFixed(1)}g
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      borderWidth: 3,
                      borderColor: colors.app.blue_100,
                    }}
                  ></View>
                  <Text
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      color: colors.tailwind.gray._400,
                      fontFamily: "Inter",
                      fontSize: 15,
                      marginRight: 5,
                    }}
                  >
                    {t_c.toFixed(1)}g
                  </Text>
                </View>
              </View>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("newitem", {
                    session,
                  })
                }
              >
                <LinearGradient
                  colors={[
                    colors.tailwind.green._500,
                    colors.tailwind.green._600,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 33,
                    height: 33,
                    backgroundColor: colors.app.green_200,
                    borderRadius: 999,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
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
  container: {
    padding: 20,
    borderColor: colors.app.dark_100,
    borderRadius: 25,
    borderWidth: 3,
  },
  children: {
    marginTop: 15,
    paddingTop: 5,
    borderTopWidth: 2,
    borderTopColor: colors.app.dark_100,
  },
});

export default Card;
