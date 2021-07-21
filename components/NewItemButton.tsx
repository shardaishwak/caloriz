import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NewItemButton = (props) => {
  return (
    <View style={{ justifyContent: "flex-end", flex: 1 }}>
      <TouchableOpacity
        style={{
          borderRadius: 999,
          width: 50,
          height: 50,

          backgroundColor: "#A167A5",

          shadowColor: "#91F291",
          shadowOpacity: 0.2,
          shadowRadius: 20,
          position: "absolute",
          bottom: 20,
          elevation: 10,
          right: 20,
        }}
        onPress={() => props.navigation.navigate("newitem")}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Text style={{ color: "#fff", marginLeft: 2 }}>
            <Ionicons name="add" size={30} />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NewItemButton;
