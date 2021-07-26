import React from "react";

import colors from "../../colors";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";

const Cards = ({ data }) => {
  const data_local = [
    {
      id: 1,
      name: "Calories",
      value: data.nf_calories.toFixed(1) + " kc",
      icon: (
        <SimpleLineIcons
          name="fire"
          size={22.5}
          color={colors.tailwind.green._700}
        />
      ),
      opacity_color: colors.tailwind.green._50,
    },
    {
      id: 2,
      name: "Carbs",
      value: data.nf_total_carbohydrate.toFixed(1) + "g",
      opacity_color: colors.tailwind.purple._50,
      icon: (
        <MaterialIcons
          name="grass"
          size={22.5}
          color={colors.tailwind.purple._700}
        />
      ),
    },
    {
      id: 3,
      name: "Fat",
      value: data.nf_total_fat.toFixed(1) + "g",
      opacity_color: colors.tailwind.orange._50,
      icon: (
        <MaterialCommunityIcons
          name="spoon-sugar"
          size={25}
          color={colors.tailwind.orange._700}
        />
      ),
    },
    {
      id: 4,
      name: "Protein",
      value: data.nf_protein.toFixed(1) + "g",
      opacity_color: colors.tailwind.sky._50,
      icon: (
        <Ionicons
          name="egg-outline"
          size={22.5}
          color={colors.tailwind.sky._700}
        />
      ),
    },
  ];
  return (
    <FlatList
      data={data_local}
      numColumns={2}
      style={{ marginTop: 20 }}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            padding: 20,
            borderWidth: 2.5,
            borderRadius: 20,
            marginRight: index % 2 === 0 ? 20 : 0,
            borderColor: colors.app.dark_100,
            marginBottom: 20,
            paddingVertical: 25,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              backgroundColor: item.opacity_color,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: colors.app.dark_500, fontFamily: "Inter" }}>
              {item.name}
            </Text>
            <Text
              style={{ color: colors.app.dark_500, fontFamily: "Inter-Medium" }}
            >
              {item.value}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default Cards;
