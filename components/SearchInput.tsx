import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

const SearchInput = (props: {
  placeholder: string;
  onSearch: any;
  loading: boolean;
}) => {
  const [text, setText] = useState<string>();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ margin: 20 }}>
        <View
          style={{
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
          }}
        >
          <TextInput
            placeholder={props.placeholder}
            onEndEditing={() => props.onSearch(text)}
            onEnded={() => props.onSearch(text)}
            value={text}
            onChangeText={(e) => setText(e)}
            style={{
              fontSize: 15,
              width: "85%",
              fontFamily: "Inter-Medium",
              color: colors.app.dark_500,
            }}
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
    </TouchableWithoutFeedback>
  );
};

export default SearchInput;
