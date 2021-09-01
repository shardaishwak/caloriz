import React, { useState } from "react";

import {
  TouchableNativeFeedback,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import colors from "../colors";
import { Gender, Profile } from "../interface";

import Header from "../components/Header";

import db from "../global@deprecated/db";

import Input from "../widgets/ProfileScreen/Input";
import OptionBox from "../widgets/ProfileScreen/OptionBox";
import { RootState, useRootDispatch } from "../store";
import { profileSlice } from "../store/reducers/profile.reducer";
import { useSelector } from "react-redux";
import profileAction from "../store/actions/profile.action";

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

const ProfileScreen: React.FC<{ navigation: StackNavigationHelpers }> = ({
  navigation,
}) => {
  const dispatch = useRootDispatch();
  const profile = useSelector<RootState>((state) => state.profile) as Profile;
  const router = useNavigation();

  const [mass, setMass] = useState<number>(profile.mass || 0);
  const [name, setName] = useState<string>(profile.name || "");
  const [height, setHeight] = useState<number>(profile.height || 0);
  const [gender, setGender] = useState<Gender>(profile.gender || null);
  const [username, setUsername] = useState<string>(profile.username || "");

  const [calories, setCalories] = useState<number>(
    profile.calories_target || 0
  );
  const [date, setDate] = useState<string>(
    profile.date_of_birth?.value
      ? moment(profile.date_of_birth?.value as moment.Moment).format("DDMMYYYY")
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
    await dispatch(profileAction.UpdateProfile(update));
    setLoading(false);

    if (profile.new_user !== false) return router.navigate("entry");
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]}>
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
      <TouchableNativeFeedback onPress={!loading && UpdateProfile}>
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
