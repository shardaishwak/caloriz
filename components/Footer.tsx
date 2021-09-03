import React from "react";

import { TouchableWithoutFeedback, View, Text } from "react-native";
import colors from "../colors";

const Footer = () => {
  return (
    <View style={{ margin: 20 }}>
      <TouchableWithoutFeedback>
        <Text style={{ color: colors.app.dark_200, textAlign: "center", fontSize: 14, }}>
          Created by Ishwak Sharda. All rights reserverd
          {" @" + new Date().getFullYear()}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Footer;
