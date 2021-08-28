import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "../screens/Main.screen";
import NewItemScreen from "../screens/NewItem.screen";
import ProfileScreen from "../screens/ProfileScreen";

// Root navigation
const Navigation: React.FC = () => (
  <NavigationContainer>
    <StackNavigation />
  </NavigationContainer>
);

const Stack = createStackNavigator();

const StackNavigation: React.FC = () => (
  <Stack.Navigator
    initialRouteName="entry" // first_time.value ?? onboarding : entry
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="entry" component={MainScreen} />
    {/*<Stack.Screen name="details" component={() => <View></View>} />*/}
    <Stack.Screen name="newitem" component={NewItemScreen} />
    <Stack.Screen name="settings:profile" component={ProfileScreen} />
  </Stack.Navigator>
);

export default Navigation;
