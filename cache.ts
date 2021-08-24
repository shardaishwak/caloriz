import * as Font from "expo-font";
import Constants from "expo-constants";
import db from "./global/db";
import {
  ADD_NEW_DATE,
  ADD_DATA,
  INITIALIZE_FAVOURITES,
  SET_APP_DATE,
  SET_FIRST_TIME,
} from "./global/constraints";
import { FirstTime } from "./interface";
import log from "./log";
import { todayDate } from "./time";

// Load all the fonts
/**
 * @description Load all custom fonts
 * @param null
 */
const LoadFonts = async () => {
  await Font.loadAsync({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    Inter: require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Semibold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });
};

/**
 * @description Run cache -> fetch local data + add state + fonts
 * @param dispatch (update state)
 */
export const LoadData = async (initial_date, dispatch) => {
  // Retieve daily record.
  const is_data = await db.retrieveRouteine(initial_date);
  log("[DATABASE]", is_data);

  //await AsyncStorage.setItem(todayDate(), JSON.stringify(setDefaultDate()));
  // Check if a daily record is present, create new if not
  if (!is_data || Object.keys(is_data).length === 0) {
    // Create a new daily record [db]
    await db.initializeRouteine(initial_date);
    // Create a new daily record [state]
    dispatch({ type: ADD_NEW_DATE, date: initial_date });
  } else {
    // load daily record to state
    dispatch({ type: ADD_DATA, payload: is_data, date: initial_date });
  }
  // await db.clearFavourites();
  dispatch({ type: INITIALIZE_FAVOURITES, data: await db.getFavourites() });
  dispatch({ type: SET_APP_DATE, date: initial_date });
};

/**
 * @description Check if the user is entering for the first time
 * Update the inputted profile details
 *
 * Merge with user profile
 */
const CheckFirstTime = async (dispatch) => {
  const is_record = await db.getFirstTime();
  console.log(is_record);
  if (is_record.created_at && is_record.version) {
    // User already a member - no onboarding
    dispatch({ type: SET_FIRST_TIME, payload: is_record });
  }
};

/**
 * @description Initialize the cache on first app render
 * @param global (dispatch)
 */
const LoadCache = async (global) => {
  log("[CACHE]", "Initialized");

  await LoadFonts();
  await LoadData(todayDate(), global.dispatch);
  await CheckFirstTime(global.dispatch);

  log("[CACHE]", "Finished");
};
export default LoadCache;
