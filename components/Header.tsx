import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

const Header = (props: {
  navigation: StackNavigationHelpers;
  page?: string;
  small?: string;
  rightIcon?: React.FC;
}) => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff80",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 70,
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      {props.navigation.canGoBack() ? (
        <TouchableNativeFeedback onPress={props.navigation.goBack}>
          <Ionicons size={25} name="arrow-back" />
        </TouchableNativeFeedback>
      ) : (
        <View style={{ width: 25, height: 25 }}></View>
      )}
      {props.page && props.small ? (
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 19,
              fontFamily: "Inter",
              color: "#212121",
            }}
          >
            {props.page}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Inter",
              color: "#21212170",
              marginTop: -5,
            }}
          >
            {props.small}
          </Text>
        </View>
      ) : (
        <Text
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            color: "#212121",
            fontSize: 22,
          }}
        >
          Caloriz
        </Text>
      )}
      <View style={{ height: 25, width: 25 }}>{props.rightIcon}</View>
    </View>
  );
};

export default Header;
