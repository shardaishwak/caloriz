import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  return (
    <View style={{ margin: 20, marginBottom: 10 }}>
      <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
        <View style={styles.container}>
          <View>
            <Text style={{ fontSize: 22.5, fontFamily: "Inter-Medium" }}>
              {title}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: "#21212170",
                  marginRight: 7,
                  fontFamily: "Poppins",
                }}
              >
                {t_kcal} kcal
              </Text>
              <Text
                style={{
                  color: "#21212170",
                  marginRight: 7,
                  marginLeft: 7,

                  fontFamily: "Poppins",
                }}
              >
                {t_p}g
              </Text>
              <Text
                style={{
                  color: "#21212170",
                  marginRight: 7,
                  marginLeft: 7,
                  fontFamily: "Poppins",
                }}
              >
                {t_f}g
              </Text>
              <Text
                style={{
                  color: "#21212170",
                  marginRight: 7,
                  marginLeft: 7,
                  fontFamily: "Poppins",
                }}
              >
                {t_c}g
              </Text>
            </View>
          </View>
          <Ionicons name={open ? "chevron-up" : "chevron-down"} size={22.5} />
        </View>
      </TouchableWithoutFeedback>
      {open && (
        <View>
          <Text>{props.children}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: "#21212115",
    borderRadius: 25,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Card;
