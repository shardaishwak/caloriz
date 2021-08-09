import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { setDefaultDate, todayDate } from "./global/actions";
import db from "./global/db";
import {
  ADD_NEW_DATE,
  ADD_DATA,
  INITIALIZE_FAVOURITES,
} from "./global/provider";
import log from "./log";

// Load all the fonts
/**
 * @description Load all custom fonts
 * @param null
 */
const LoadFonts = async () => {
  await Font.loadAsync({
    Poppins: require("./assets/static/Poppins-Regular.ttf"),
    Inter: require("./assets/static/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/static/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/static/Inter-Bold.ttf"),
    "Inter-Semibold": require("./assets/static/Inter-SemiBold.ttf"),
  });
};

/**
 * @description Run cache -> fetch local data + add state + fonts
 * @param dispatch (update state)
 */
const LoadData = async (dispatch) => {
  // Retieve daily record.
  const is_data = await db.retrieveRouteine(todayDate());
  log("[DATABASE]", is_data);

  //await AsyncStorage.setItem(todayDate(), JSON.stringify(setDefaultDate()));
  // Check if a daily record is present, create new if not
  if (!is_data || Object.keys(is_data).length === 0) {
    // Create a new daily record [db]
    await db.initializeRouteine(todayDate());
    // Create a new daily record [state]
    dispatch({ type: ADD_NEW_DATE, date: todayDate() });
  } else {
    // load daily record to state
    dispatch({ type: ADD_DATA, payload: is_data, date: todayDate() });
  }
  // await db.clearFavourites();
  dispatch({ type: INITIALIZE_FAVOURITES, data: await db.getFavourites() });
};

/**
 * @description Initialize the cache on first app render
 * @param global (dispatch)
 */
const LoadCache = async (global) => {
  log("[CACHE]", "Initialized");

  await LoadFonts();
  await LoadData(global.dispatch);

  log("[CACHE]", "Finished");
};
export default LoadCache;
