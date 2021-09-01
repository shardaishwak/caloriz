import React, { useState } from "react";

import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../../colors";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Design of the search input used in @NewItemScreen
 */
const SearchInput = (props: {
  onSearch: any;
  loading: boolean;
  placeholder: string;
}) => {
  const [text, setText] = useState<string>();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["rgba(255,255,255,.9)", "#ffffff00"]}
        locations={[0.5, 0.9]}
      >
        <View style={{ padding: 20, paddingBottom: 40 }}>
          <View style={styles.container}>
            <TextInput
              placeholder={props.placeholder}
              onEndEditing={() => props.onSearch(text)}
              onEnded={() => props.onSearch(text)}
              value={text}
              onChangeText={(e) => setText(e)}
              style={styles.input}
            />
            <TouchableNativeFeedback onPress={() => props.onSearch(text)}>
              {props.loading ? (
                <ActivityIndicator size={20} color={colors.app.dark_500} />
              ) : (
                <Ionicons name="md-search" size={20} />
              )}
            </TouchableNativeFeedback>
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 12.5,
    paddingBottom: 12.5,
    borderWidth: 2,
    borderColor: colors.app.dark_100,
    backgroundColor: colors.app.dark_100,
    borderRadius: 15,
  },
  input: {
    fontSize: 15,
    width: "85%",
    fontFamily: "Inter-Medium",
    color: colors.app.dark_500,
  },
});

export default SearchInput;
