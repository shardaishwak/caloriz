import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { ADD_NEW_DATE } from "./global/provider";

// Load all the fonts
const LoadFonts = async () => {
  await Font.loadAsync({
    Poppins: require("./assets/static/Poppins-Regular.ttf"),
    Inter: require("./assets/static/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/static/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/static/Inter-Bold.ttf"),
    "Inter-Semibold": require("./assets/static/Inter-SemiBold.ttf"),
  });
};

// Load local data
const LoadData = async () => {};

const LoadCache = async (global) => {
  await LoadFonts();
  global.dispatch({ type: ADD_NEW_DATE });

  console.log("Cached");
};
export default LoadCache;
