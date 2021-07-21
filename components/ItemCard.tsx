import React from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";

const ItemCard = (props) => {
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          alignItems: "center",
          padding: 15,
          paddingTop: 15,
          paddingBottom: 30,
          borderRadius: 25,
          borderWidth: 2,
          borderColor: "#21212115",
          width: "46.5%",
          marginBottom: 20,
        }}
      >
        <Image
          source={{
            uri: props.data.image.urls.regular,
          }}
          style={{ width: "100%", height: 120, borderRadius: 20 }}
        />
        <Text
          style={{
            color: "#212121",
            fontFamily: "Inter-Medium",
            fontSize: 20,
            marginTop: 15,
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          {props.data.lowercaseDescription}
        </Text>
        <Text style={{ color: "#21212170" }}>
          1 piece /{" "}
          {props.data.foodNutrients.find((a) => a.nutrientId === 1008).value}{" "}
          kcal
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ItemCard;
