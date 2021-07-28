import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { setDefaultDate, todayDate } from "./global/actions";
import { ADD_NEW_DATE, ADD_TODAY_DATA } from "./global/provider";

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

const LoadData = async (dispatch) => {
  const is_data = JSON.parse(await AsyncStorage.getItem(todayDate()));
  console.log(1, is_data);
  //await AsyncStorage.setItem(todayDate(), JSON.stringify(setDefaultDate()));
  // See there is already some data for today
  if (Object.keys(is_data).length === 0) {
    console.log("New date");
    // Create a new field for the data
    await AsyncStorage.setItem(todayDate(), JSON.stringify(setDefaultDate()));
    dispatch({ type: ADD_NEW_DATE });
  } else {
    console.log("loading date");
    dispatch({ type: ADD_TODAY_DATA, payload: is_data });
  }
};

const LoadCache = async (global) => {
  await LoadFonts();
  await LoadData(global.dispatch);

  console.log("Cached");
};
export default LoadCache;
