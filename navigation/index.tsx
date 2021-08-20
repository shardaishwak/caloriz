import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "../screens/Main.screen";
import NewItemScreen from "../screens/NewItem.screen";

// Root navigation
const Navigation: React.FC = () => (
  <NavigationContainer>
    <StackNavigation />
  </NavigationContainer>
);

const Stack = createStackNavigator();

const StackNavigation: React.FC = () => (
  <Stack.Navigator
    initialRouteName="entry"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen
      name="entry"
      component={MainScreen}
      options={{
        headerShown: false,
      }}
    />
    {/*<Stack.Screen name="details" component={() => <View></View>} />*/}
    <Stack.Screen
      name="newitem"
      component={NewItemScreen}
      options={{
        headerTransparent: true,
        headerTitleAlign: "center",
        title: "New Food",
      }}
    />
  </Stack.Navigator>
);

export default Navigation;
