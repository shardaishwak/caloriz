import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import colors from "../../colors";

const SaveButton = ({ onSave }: { onSave: any }) => {
  const [is_pressing, set_is_pressing] = useState<boolean>(false);
  return (
    <View
      style={{ marginTop: 10, height: 70, marginBottom: 0, borderRadius: 15 }}
    >
      <Pressable
        style={{ borderRadius: 15 }}
        onTouchStart={() => set_is_pressing(true)}
        onTouchEnd={() => set_is_pressing(false)}
        onPress={onSave}
      >
        <View
          style={{
            backgroundColor: colors.app.green_100,
            borderRadius: 15,
            elevation: is_pressing ? 0 : 5,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter-Semibold",
              color: "#fff",
              paddingVertical: 15,
              fontSize: 17.5,
              textAlign: "center",
            }}
          >
            Save
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SaveButton;
