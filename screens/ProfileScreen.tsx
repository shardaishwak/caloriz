import React, { MutableRefObject, ReactChild } from "react";
import { useState } from "react";
import {
  KeyboardType,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import { View, Text, ActivityIndicator } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import colors from "../colors";
import Header from "../components/Header";
import db from "../global/db";
import { useGlobal } from "../global/provider";

import Constants from "expo-constants";
import { UPDATE_PROFILE } from "../global/constraints";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Gender } from "../interface";
import { useRef } from "react";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";

const isValidDate = (date: string) => {
  const m_date = moment(date, "DDMMYYYY", true);
  return [m_date.isValid(), m_date];
};

const Age = (date) => {
  const a = moment();
  const b = moment(date, "DDMMYYYY");
  const age = a.diff(b, "years", true);
  return age;
};

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
  const ref = useRef<any>();
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
          ref={ref}
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
      {dropdown && isFocus && (
        <View
          style={{
            backgroundColor: "#ffffff",
            position: "absolute",
            marginTop: 80,
            width: "100%",
            elevation: 2,
            borderRadius: 5,
            maxHeight: 100,
            zIndex: 2,
          }}
        >
          {dropdown}
        </View>
      )}
    </View>
  );
};

const OptionBox: React.FC<{
  value: string;
  description: string;
  name: string;
  options: Array<any>;
  onChange: (e: any) => void;
}> = ({ name, description, value, options, onChange }) => {
  return (
    <View style={{ width: "100%", marginVertical: 10 }}>
      <View
        style={{
          minHeight: 75,
          justifyContent: "center",
          borderWidth: 2,
          borderColor: "transparent",
          borderRadius: 7.5,
          paddingVertical: 7.5,
          paddingHorizontal: 15,
          backgroundColor: colors.app.dark_100,
        }}
      >
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}
          >
            {options.map((option, index) => (
              <TouchableWithoutFeedback
                key={option}
                onPress={() => onChange(option)}
              >
                <Text
                  style={{
                    backgroundColor:
                      value === option
                        ? colors.app.dark_400
                        : colors.app.dark_100,
                    borderWidth: 1,
                    borderColor: colors.app.dark_200,

                    fontFamily: "Inter",
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    color: value === option ? "#fff" : colors.app.dark_400,
                    textTransform: "capitalize",
                    fontSize: 13,
                    marginRight: index + 1 !== options.length ? 10 : 0,
                  }}
                >
                  {option}
                </Text>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
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
    </View>
  );
};

const ProfileScreen: React.FC<{ navigation: StackNavigationHelpers }> = ({
  navigation,
}) => {
  const {
    state: { profile },
    dispatch,
  } = useGlobal();
  const router = useNavigation();
  const [name, setName] = useState<string>(profile.name || "");
  const [username, setUsername] = useState<string>(profile.username || "");
  const [gender, setGender] = useState<Gender>(profile.gender || null);
  const [mass, setMass] = useState<number>(profile.mass || 0);
  const [height, setHeight] = useState<number>(profile.height || 0);
  const [calories, setCalories] = useState<number>(
    profile.calories_target || 0
  );
  const [date, setDate] = useState<string>(
    profile.date_of_birth?.value
      ? moment(profile.date_of_birth?.value as Date).format("DDMMYYYY")
      : ""
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
      gender,
      ...(isValidDate(date)[0]
        ? { date_of_birth: { value: isValidDate(date)[1], age: Age(date) } }
        : {}),
      ...(profile.new_user !== false
        ? { version: Constants.manifest.version, new_user: false }
        : {}),
    };
    await db.updateProfile(update);
    dispatch({ type: UPDATE_PROFILE, payload: update });
    setLoading(false);

    if (profile.new_user !== false) return router.navigate("entry");
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView>
        <Header
          goBack={profile.new_user !== false ? false : true}
          navigation={navigation}
          page={"Profile"}
          small={profile.new_user !== false ? "Set-up your profile" : null}
        />
        <View
          style={{
            paddingHorizontal: 30,
            paddingBottom: 20,
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
          <OptionBox
            value={gender}
            name="Gender"
            description={"All the modalities and tips are based on gender."}
            onChange={(e) => setGender(e)}
            options={[Gender.male, Gender.female, Gender.other]}
          />
          <Input
            value={
              date.slice(0, 2) +
              (date.slice(0, 2).length === 2 ? "/" : "") +
              date.slice(2, 4) +
              (date.slice(2, 4).length === 2 ? "/" : "") +
              date.slice(4, 8)
            }
            type={"number-pad"}
            name="Date of Birth"
            placeholder={"30/07/1975"}
            description={
              "Required for date based recommentations." +
              (isValidDate(date)[0] &&
                "\nYou are " + Math.floor(Age(date)) + " years old.")
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
                  setHeight(!e ? 0 : parseFloat(e));
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
                  setMass(!e ? 0 : parseFloat(e));
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
              setCalories(!e ? 0 : parseFloat(e));
            }}
          />
        </View>
      </ScrollView>
      <TouchableNativeFeedback onPress={UpdateProfile}>
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
          {loading && (
            <View style={{ width: 25, height: 25, marginRight: 10 }}>
              <ActivityIndicator size={25} color={colors.app.dark_400} />
            </View>
          )}
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
      </TouchableNativeFeedback>
    </View>
  );
};

export default ProfileScreen;
