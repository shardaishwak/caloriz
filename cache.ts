import * as Font from "expo-font";

import db from "./global@deprecated/db";

import log from "./log";
import { todayDate } from "./time";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile } from "./interface";
import store from "./store";
import { dateConsumptionSlice } from "./store/reducers/dateConsumption.reducer";
import { setDefaultDate } from "./global@deprecated/actions";
import { profileSlice } from "./store/reducers/profile.reducer";
import { generalSlice } from "./store/reducers/general.reducer";
import { cacheSlice } from "./store/reducers/cache.reducer";

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
export const LoadData = async (initial_date) => {
  // Retieve daily record.
  const is_data = await db.retrieveRouteine(initial_date);
  log("[DATABASE]", is_data);

  //await AsyncStorage.setItem(todayDate(), JSON.stringify(setDefaultDate()));
  // Check if a daily record is present, create new if not
  if (!is_data || Object.keys(is_data).length === 0) {
    // Create a new daily record [db]
    await db.initializeRouteine(initial_date);
    // Create a new daily record [state]
    store.dispatch(dateConsumptionSlice.actions.loadRecord(setDefaultDate()));
  } else {
    // load daily record to state
    store.dispatch(dateConsumptionSlice.actions.loadRecord(is_data));
  }
  // await db.clearFavourites();
  const favourites = await db.getFavourites();
  store.dispatch(cacheSlice.actions.loadFavourites(favourites || []));

  store.dispatch(generalSlice.actions.setAppRecord(initial_date));
};

/**
 * @description Check if the user is entering for the first time
 * Update the inputted profile details
 *
 * Merge with user profile
 */
const LoadProfile = async () => {
  //await AsyncStorage.removeItem("@profile");
  const profile: Profile = await db.getProfile();
  log("[PROFILE]", profile);

  if (!profile.new_user) {
    store.dispatch(profileSlice.actions.loadProfile(profile));
  }
};

/**
 * @description Initialize the cache on first app render
 * @param global (dispatch)
 */
const LoadCache = async () => {
  log("[CACHE]", "Initialized");

  await LoadFonts();
  await LoadData(todayDate());
  await LoadProfile();

  log("[CACHE]", "Finished");
};
export default LoadCache;
