import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MainScreen from "../screens/Main.screen";
import NewItemScreen from "../screens/NewItem.screen";
import ProfileScreen from "../screens/Profile.screen";
import OnboardingScreen from "../screens/Onboarding.screen";

import { useRootState } from "../store";

// Root navigation
const Navigation: React.FC = () => (
  <NavigationContainer>
    <StackNavigation />
  </NavigationContainer>
);

const Stack = createStackNavigator();

const StackNavigation: React.FC = () => {
  const new_user = useRootState((state) => state.profile.new_user);
  return (
    <Stack.Navigator
      initialRouteName={new_user !== false ? "onboarding" : "entry"} // first_time.value ?? onboarding : entry
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="entry" component={MainScreen} />
      <Stack.Screen name="newitem" component={NewItemScreen} />
      <Stack.Screen name="onboarding" component={OnboardingScreen} />
      <Stack.Screen name="settings:profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
