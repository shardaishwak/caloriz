import React from "react";
import { StyleSheet } from "react-native";

import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import colors from "../../colors";

const OptionBox: React.FC<{
  value: string;
  description: string;
  name: string;
  options: Array<any>;
  onChange: (e: any) => void;
}> = ({ name, description, value, options, onChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.name}>{name}</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.options_container}>
            {options.map((option, index) => (
              <TouchableWithoutFeedback
                key={option}
                onPress={() => onChange(option)}
              >
                <Text
                  style={[
                    styles.option,
                    {
                      backgroundColor:
                        value === option
                          ? colors.app.dark_500
                          : colors.app.dark_100,
                      color: value === option ? "#fff" : colors.app.dark_400,
                      marginRight: index + 1 !== options.length ? 10 : 0,
                    },
                  ]}
                >
                  {option}
                </Text>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      </View>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", marginVertical: 10 },
  wrapper: {
    minHeight: 75,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 7.5,
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    backgroundColor: colors.app.dark_100,
  },
  name: {
    fontSize: 13,
    color: colors.app.dark_300,
    marginBottom: 2.5,
    fontFamily: "Inter",
  },
  options_container: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  option: {
    borderWidth: 1,
    borderColor: colors.app.dark_200,

    fontFamily: "Inter",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    textTransform: "capitalize",
    fontSize: 13,
  },
  desc: {
    color: colors.app.dark_300,
    fontSize: 14,
    fontFamily: "Inter",
    marginTop: 7.5,
  },
});

export default OptionBox;
