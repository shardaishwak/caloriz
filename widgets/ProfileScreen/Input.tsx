import React, { ReactChild, useState } from "react";
import { KeyboardType, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../colors";

const Input: React.FC<{
  name: string;
  type: KeyboardType;
  value: string;
  description?: string;
  placeholder: string;
  onChange: (text: string) => void;
}> = ({ name, type, placeholder, value, description, onChange }) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          { borderColor: isFocus ? colors.tailwind.blue._200 : "transparent" },
        ]}
      >
        {(isFocus || !!value) && <Text style={styles.name}>{name}</Text>}
        <TextInput
          onChangeText={onChange}
          spellCheck={false}
          placeholder={isFocus ? placeholder : name}
          style={[
            styles.input,
            { color: isFocus ? colors.app.dark_500 : colors.app.dark_400 },
          ]}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          keyboardType={type}
        />
      </View>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", marginVertical: 10 },
  wrapper: {
    height: 75,
    justifyContent: "center",
    borderWidth: 2,
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
  input: {
    width: "100%",
    fontSize: 16,
    fontFamily: "Inter",
  },
  desc: {
    color: colors.app.dark_300,
    fontSize: 14,
    fontFamily: "Inter",
    marginTop: 7.5,
  },
});

export default Input;
