import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

const Card = ({
  title,
  t_kcal,
  t_p,
  t_f,
  t_c,
  ...props
}: {
  title: string;
  children?: any;
  t_kcal: number;
  t_p: number;
  t_f: number;
  t_c: number;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const calories = 200;
  return (
    <View style={{ margin: 20, marginBottom: 10 }}>
      <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
        <View style={styles.container}>
          <View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 22.5,
                  fontFamily: "Inter-Medium",
                  color: colors.app.dark_500,
                }}
              >
                {title}
              </Text>
              <Ionicons
                name={open ? "chevron-up" : "chevron-down"}
                size={22.5}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  backgroundColor: colors.app.dark_100,
                  color:
                    calories < 250
                      ? colors.app.green_200
                      : calories >= 250 && calories < 600
                      ? colors.app.yellow_100
                      : colors.app.red_100, // fcbe11 // ff2400"#32cd32", // fcbe11 // ff2400

                  borderRadius: 5,
                  fontFamily: "Inter-Medium",
                  fontSize: 15,
                  marginRight: 10,
                }}
              >
                {calories} kcal
              </Text>
              <Text
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  backgroundColor: colors.app.dark_100,
                  color: colors.tailwind.gray._500,
                  borderRadius: 5,
                  fontFamily: "Inter-Medium",
                  fontSize: 15,
                  marginRight: 10,
                }}
              >
                {t_p}g
              </Text>
              <Text
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  backgroundColor: colors.app.dark_100,
                  color: colors.tailwind.gray._500,
                  borderRadius: 5,
                  fontFamily: "Inter-Medium",
                  fontSize: 15,
                  marginRight: 10,
                }}
              >
                {t_f}g
              </Text>
              <Text
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  backgroundColor: colors.app.dark_100,
                  color: colors.tailwind.gray._500,
                  borderRadius: 5,
                  fontFamily: "Inter-Medium",
                  fontSize: 15,
                  marginRight: 10,
                }}
              >
                {t_c}g
              </Text>
            </View>
          </View>
          {open && (
            <View style={{ marginTop: 20 }}>
              <Text>{props.children}</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
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
});

export default Card;
