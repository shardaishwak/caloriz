import React from "react";

import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../../colors";

const Inputs = ({
  onQuantityChange,
  onTypeChange,
  quantity,
  type,
}: {
  onQuantityChange: any;
  onTypeChange: any;
  quantity: number;
  type: string;
}) => (
  <View
    style={{
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 20,
      marginTop: 30,
      marginBottom: 0,
    }}
  >
    <View
      style={{
        backgroundColor: colors.app.dark_100,
        borderRadius: 15,
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 7.5,
        marginRight: 10,
      }}
    >
      <Text
        style={{
          color: colors.tailwind.cool_gray._400,
          fontFamily: "Inter-Medium",
        }}
      >
        Quantity
      </Text>
      <TextInput
        placeholder="1"
        defaultValue={"1"}
        keyboardType={"number-pad"}
        onChangeText={onQuantityChange}
        value={quantity.toString()}
        style={{
          fontSize: 16,
          fontFamily: "Inter-Semibold",
          color: colors.app.dark_600,
        }}
      />
    </View>
    <View
      style={{
        backgroundColor: colors.app.dark_100,
        borderRadius: 15,
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 7.5,
        marginLeft: 10,
      }}
    >
      <Text
        style={{
          color: colors.tailwind.cool_gray._400,
          fontFamily: "Inter-Medium",
        }}
      >
        Type
      </Text>
      <TextInput
        placeholder="Pieces"
        enabled={false}
        onChangeText={onTypeChange}
        value={type}
        editable={false}
        style={{
          fontSize: 16,
          fontFamily: "Inter-Semibold",
          color: colors.app.dark_600,
        }}
      />
    </View>
  </View>
);

export default Inputs;
