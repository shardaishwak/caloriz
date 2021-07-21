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
import ItemCard from "./ItemCard";

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
            borderColor: "#21212115",
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
            }}
          />
          <TouchableNativeFeedback onPress={() => props.onSearch(text)}>
            {props.loading ? (
              <ActivityIndicator size={20} color="#212121" />
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
