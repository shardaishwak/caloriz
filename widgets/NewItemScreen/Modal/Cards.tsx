import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

import colors from "../../../colors";

/**
 * @connect ItemModal index.js
 * Component for the 4 cards that show the additional information about a product
 */
const Cards = ({ data }) => {
  // 4 nutritional informations given in the modal
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
      scrollEnabled={false}
      renderItem={({ item, index }) => (
        <View
          style={[styles.container, { marginRight: index % 2 === 0 ? 20 : 0 }]}
        >
          <View style={[styles.icon, { backgroundColor: item.opacity_color }]}>
            {item.icon}
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderWidth: 2.5,
    borderRadius: 20,
    borderColor: colors.app.dark_100,
    marginBottom: 20,
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { color: colors.app.dark_500, fontFamily: "Inter" },
  value: { color: colors.app.dark_500, fontFamily: "Inter-Medium" },
});

export default Cards;
