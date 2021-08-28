import React, { ReactChild } from "react";
import { useState } from "react";
import { KeyboardType } from "react-native";
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import colors from "../colors";
import Header from "../components/Header";
import db from "../global/db";
import { useGlobal } from "../global/provider";

import Constants from "expo-constants";
import { UPDATE_PROFILE } from "../global/constraints";
const Input: React.FC<{
  name: string;
  type: KeyboardType;
  value: string;
  description?: string;
  placeholder: string;
  onChange: (text: string) => void;
  dropdown?: ReactChild;
}> = ({ name, type, placeholder, value, description, dropdown, onChange }) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <View style={{ width: "100%", marginVertical: 10 }}>
      <View
        style={{
          height: 75,
          justifyContent: "center",
          borderWidth: 2,
          borderColor: isFocus ? colors.tailwind.blue._200 : "transparent",
          borderRadius: 7.5,
          paddingVertical: 7.5,
          paddingHorizontal: 15,
          backgroundColor: colors.app.dark_100,
        }}
      >
        {(isFocus || !!value) && (
          <Text
            style={{
              fontSize: 13,
              color: colors.app.dark_300,
              marginBottom: 2.5,
              fontFamily: "Inter",
            }}
          >
            {name}
          </Text>
        )}
        <TextInput
          onChangeText={onChange}
          spellCheck={false}
          placeholder={isFocus ? placeholder : name}
          style={{
            width: "100%",
            fontSize: 16,
            color: isFocus ? colors.app.dark_500 : colors.app.dark_400,
            fontFamily: "Inter",
          }}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          keyboardType={type}
        />
      </View>
      <View style={{ marginTop: 7.5 }}>
        <Text
          style={{
            color: colors.app.dark_300,
            fontSize: 14,
            fontFamily: "Inter",
          }}
        >
          {description}
        </Text>
      </View>
      {dropdown && (
        <View
          style={{
            backgroundColor: "#ffffff",
            position: "absolute",
            marginTop: 80,
            width: "100%",
            elevation: 2,
            borderRadius: 5,
            maxHeight: 100,
          }}
        >
          {dropdown}
        </View>
      )}
    </View>
  );
};

const ProfileForm: React.FC<{}> = () => {
  const {
    state: { profile },
    dispatch,
  } = useGlobal();

  const [name, setName] = useState<string>(profile.name || "");
  const [username, setUsername] = useState<string>(profile.username || "");
  const [mass, setMass] = useState<number>(profile.mass || 0);
  const [height, setHeight] = useState<number>(profile.height || 0);
  const [calories, setCalories] = useState<number>(
    profile.calories_target || 0
  );
  const [date, setDate] = useState<string>(
    (profile.date_of_birth as string) || ""
  );

  const [loading, setLoading] = useState<boolean>(false);

  const UpdateProfile = async () => {
    setLoading(true);
    const update = {
      name,
      username,
      mass,
      height,
      calories_target: calories,
      ...(profile.new_user !== false
        ? { version: Constants.manifest.version, new_user: false }
        : {}),
    };
    await db.updateProfile(update);
    dispatch({ type: UPDATE_PROFILE, payload: update });
    setLoading(false);
  };

  return (
    <View>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 30,
          }}
        >
          <Input
            value={name}
            type={"default"}
            name="Name"
            placeholder={"Lucifer Marcutti"}
            description={
              "Enter your name and your surname, separated with a space in-between."
            }
            onChange={(e) => setName(e)}
          />
          <Input
            value={username}
            type={"default"}
            name="Username"
            placeholder={"lucimarcut95"}
            description={"Your custom username of your preference. No spaces."}
            onChange={(e) => setUsername(e)}
          />
          <Input
            value={
              date.slice(0, 2) +
              (date.slice(0, 2).length === 2 ? "/" : "") +
              date.slice(2, 4) +
              (date.slice(2, 4).length === 2 ? "/" : "") +
              date.slice(4, 8)
            }
            type={"default"}
            name="Date of Birth"
            placeholder={"30/07/1975"}
            description={
              "Your date of birth is important for giving you specific healthy advice for your age group."
            }
            onChange={(e) => {
              setDate(e.split("/").join(""));
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "47.5%" }}>
              <Input
                value={height.toString()}
                type={"number-pad"}
                name="Height"
                placeholder={"94.6"}
                description={"Your height in (cm)."}
                onChange={(e) => {
                  setHeight(parseFloat(e));
                }}
              />
            </View>
            <View style={{ width: "47.5%" }}>
              <Input
                value={mass.toString()}
                type={"number-pad"}
                name="Mass"
                placeholder={"35.5"}
                description={"Your mass in (kg)."}
                onChange={(e) => {
                  setMass(parseFloat(e));
                }}
              />
            </View>
          </View>
          <Input
            value={calories.toString()}
            type={"number-pad"}
            name="Calories"
            placeholder={"94.6"}
            description={"Set your daily calories target in kilo-calories."}
            onChange={(e) => {
              setCalories(parseFloat(e));
            }}
          />
        </View>
      </ScrollView>
      <TouchableHighlight onPress={UpdateProfile}>
        <View
          style={{
            padding: 10,
            paddingVertical: 20,
            borderTopColor: colors.tailwind.gray._200,
            borderTopWidth: 2,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: 25, height: 25, marginRight: 10 }}>
            {loading && (
              <ActivityIndicator size={25} color={colors.app.dark_400} />
            )}
          </View>
          <Text
            style={{
              color: loading ? colors.app.dark_400 : colors.app.dark_600,
              fontFamily: "Inter-Medium",
              fontSize: 17,
            }}
          >
            Save Changes
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default ProfileForm;
