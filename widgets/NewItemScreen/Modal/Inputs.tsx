import React from "react";

import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../../../colors";

/**
 * @connect ItemModal index.js
 *
 * Component for the two input field of the modal: quantity and type of food
 */
const Inputs = ({
  type,
  quantity,
  onTypeChange,
  onQuantityChange,
}: {
  type: string;
  quantity: number;
  onTypeChange: any;
  onQuantityChange: any;
}) => (
  <View style={styles.container}>
    <View style={[styles.input_container, { marginRight: 10 }]}>
      <Text style={styles.input_text}>Quantity</Text>
      <View style={styles.all_center}>
        <TouchableWithoutFeedback
          onPress={() => (quantity > 0 ? onQuantityChange(quantity - 1) : null)}
        >
          <View style={{ paddingRight: 15 }}>
            <FontAwesome5
              name={"minus"}
              size={18}
              color={colors.app.dark_300}
            />
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={styles.input_value}>{quantity}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => onQuantityChange(quantity + 1)}
        >
          <View style={{ paddingLeft: 15 }}>
            <FontAwesome5 name={"plus"} size={18} color={colors.app.dark_300} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
    <View style={[styles.input_container, { marginLeft: 10 }]}>
      <Text style={styles.input_text}>Type</Text>
      <TextInput
        placeholder="Pieces"
        enabled={false}
        onChangeText={onTypeChange}
        value={type}
        editable={false}
        style={styles.input}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    marginTop: 30,
    marginBottom: 0,
  },
  input_container: {
    backgroundColor: colors.app.dark_100,
    borderRadius: 15,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 7.5,
  },
  input: {
    fontSize: 16,
    fontFamily: "Inter-Semibold",
    color: colors.app.dark_600,
  },
  input_text: {
    color: colors.tailwind.cool_gray._400,
    fontFamily: "Inter-Medium",
  },
  input_value: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: colors.app.dark_400,
  },
  all_center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default Inputs;
