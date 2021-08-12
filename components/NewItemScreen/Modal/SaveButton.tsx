import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "../../../colors";

/**
 * @connect ItemModal index.js
 *
 * The main button component for adding the modal item to the consumed list
 */
const SaveButton = ({ onSave, loading }: { onSave: any; loading: boolean }) => {
  // Check if the user is pressing the button
  const [is_pressing, set_is_pressing] = useState<boolean>(false);
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={{ borderRadius: 15 }}
        onTouchStart={() => set_is_pressing(true)}
        onTouchEnd={() => set_is_pressing(false)}
        onPress={onSave}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: is_pressing
                ? colors.tailwind.green._600
                : colors.tailwind.green._500,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size={26} color={"#ffffff"} />
          ) : (
            <Text style={styles.text}>Save</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginTop: 10, height: 70, marginBottom: 0, borderRadius: 15 },
  container: {
    backgroundColor: colors.app.green_100,
    borderRadius: 15,
    paddingVertical: 15,
  },
  text: {
    fontFamily: "Inter-Semibold",
    color: "#fff",
    fontSize: 17.5,
    textAlign: "center",
  },
});

export default SaveButton;
