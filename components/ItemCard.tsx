import React from "react";
import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import colors from "../colors";
import { SearchCommonItem } from "../interface";

/**
 * @connect NewItemScreen
 * Card for showing all the searched item from the input
 * When clicked, triggers the modal
 */
const ItemCard = ({
  data,
  onPress,
}: {
  data: SearchCommonItem;
  onPress: any;
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
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
              {data.food_name}
              <Text
                style={{
                  color: "#21212160",
                  fontSize: 13,
                  fontFamily: "Inter",
                }}
              >
                {" "}
                {data.serving_qty} {data.serving_unit}
              </Text>
            </Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.calories && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
                marginTop: 10,
              }}
            >
              {data.calories && (
                <Text
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    backgroundColor: colors.app.dark_100,
                    color:
                      data.calories < 250
                        ? colors.app.green_100
                        : data.calories >= 250 && data.calories < 600
                        ? colors.app.yellow_100
                        : colors.app.red_100, // fcbe11 // ff2400"#32cd32", // fcbe11 // ff2400

                    borderRadius: 5,
                    fontFamily: "Inter-Medium",
                    fontSize: 15,
                    marginRight: 10,
                  }}
                >
                  {data.calories} kcal
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
