import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../colors";

const ItemCard = ({ data }) => {
  const calories = data.nf_calories;
  const title = data.food_name;
  const serving_qty = data.serving_qty;
  const serving_unit = data.serving_unit;
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          padding: 20,
          borderRadius: 30,
          borderWidth: 3,
          borderColor: colors.app.dark_100,

          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              width: "90%",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={{
                color: colors.app.dark_500,
                fontSize: 18,
                textTransform: "capitalize",
                fontFamily: "Inter-Medium",
              }}
            >
              {title}
              <Text
                style={{
                  color: "#21212160",
                  fontSize: 13,
                  fontFamily: "Inter",
                }}
              >
                {" "}
                {serving_qty} {serving_unit}
              </Text>
            </Text>
          </View>
          <Feather name="star" size={20} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {calories && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
                marginTop: 10,
              }}
            >
              {calories && (
                <Text
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    backgroundColor: colors.app.dark_100,
                    color:
                      calories < 250
                        ? colors.app.green_100
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
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ItemCard;
