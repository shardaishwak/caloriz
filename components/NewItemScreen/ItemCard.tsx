import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../../colors";
import { SearchCommonItem } from "../../interface";
import { FontAwesome5 } from "@expo/vector-icons";

/**
 * @connect NewItemScreen
 * Card for showing all the searched item from the input
 * When clicked, triggers the modal
 */
const ItemCard = ({
  data: { food_name, serving_qty, serving_unit, calories },
  onPress,
}: {
  data: SearchCommonItem;
  onPress: any;
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.foodCard_container}>
        <View>
          <Text style={styles.title}>{food_name}</Text>
          <Text style={styles.informative}>
            {1} x {serving_unit} ({serving_qty}){" "}
            {calories && "/ " + calories + "kcal"}
          </Text>
        </View>
        <View>
          <LinearGradient
            colors={[colors.tailwind.blue._300, colors.tailwind.blue._400]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient_button}
          >
            <FontAwesome5 name="chevron-right" size={15} color={"#fff"} />
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  foodCard_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.app.dark_100,
  },
  title: {
    color: colors.app.dark_600,
    fontFamily: "Inter-Semibold",
    fontSize: 17,
    textTransform: "capitalize",
  },
  gradient_button: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  informative: {
    marginTop: 2,
    color: colors.app.dark_300,
    fontFamily: "Inter",
  },
});

export default ItemCard;
