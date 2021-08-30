import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonItem, DateConsumption, Profile } from "../interface";
import { setDefaultDate } from "./actions";

/** ============================ ITEM ================================ */

/**
 * @connect ADD_NEW_DATE
 * @description Create a new record for a day
 * @param date
 * @returns undefined
 */
const initializeRouteine = async (date) =>
  await AsyncStorage.setItem(date, JSON.stringify(setDefaultDate()));

/**
 * @connect ADD_DATE
 * @description Retrieve daily routine data
 * @param date
 * @returns daily routeine data;
 * @type {
 *  breakfast: Array<CommonItem>
 *  lunch: Array<CommonItem>
 *  ...
 * }
 */
const retrieveRouteine = async (date) =>
  JSON.parse(await AsyncStorage.getItem(date)) as DateConsumption;

/**
 * @connect ADD-ITEM
 * @description Add a new item to the routeine
 * @param state
 * @param date
 * @param field
 * @param data
 * @returns undefined
 */

// TODO: MOVE DATE TO THE STATE, SO NO NEED TO ADD THE DATE.
const addItem = async (date, field, data: CommonItem) => {
  const local_data = await retrieveRouteine(date);

  await AsyncStorage.setItem(
    date,
    JSON.stringify({
      ...local_data,
      [field]: [...local_data[field], { ...data }],
    }) // change breafast to [field]
  );
};

/**
 * @connect DELETE_ITEM
 * @description delete an item from routeine
 * @param state
 * @param date
 * @param field
 * @param id
 */
const deleteItem = async (date, field, id) => {
  const local_data = await retrieveRouteine(date);
  const field_data = [...local_data[field]];

  const index = field_data.findIndex((a) => a.id === id);
  if (index < 0) return;
  field_data.splice(index, 1);

  await AsyncStorage.setItem(
    date,
    JSON.stringify({
      ...local_data,
      [field]: field_data,
    })
  );
};

/** ================================ FAVOURITE ================================== */

/**
 * @connect INITIALIZE_FAVOURITES
 * @description Get the list of all the starred items
 * @returns favourites list
 */
const getFavourites = async () =>
  (JSON.parse(await AsyncStorage.getItem("@favourites")) ||
    []) as Array<CommonItem>;

/**
 * @connect SET_FAVOURITE
 * @description Add an item to the favourite list
 * @param item: CommonItem
 */
const addFavourite = async (item: CommonItem) => {
  const favourites = await getFavourites();
  favourites.push(item);
  await AsyncStorage.setItem("@favourites", JSON.stringify(favourites));
};

/**
 * @connect REMOVE_FAVOURITES
 * @description Remove an item from favourite list
 * @param id (item)
 */
const removeFavourite = async (food_name, calories) => {
  try {
    const favourites = await getFavourites();
    const index = favourites.findIndex(
      (a) => a.food_name === food_name && a.calories === calories
    );
    favourites.splice(index, 1);
    await AsyncStorage.setItem("@favourites", JSON.stringify(favourites));
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * @connect CLEAR_FAVOURITES
 * @description Clear all the data from favourites
 *
 */
const clearFavourites = async () => {
  await AsyncStorage.setItem("@favourites", JSON.stringify([]));
};

// ===================== PROFILE

const getProfile = async () =>
  JSON.parse(await AsyncStorage.getItem("@profile")) as Profile;

const updateProfile = async (updates) => {
  await AsyncStorage.setItem(
    "@profile",
    JSON.stringify({ ...(await getProfile()), ...updates })
  );
};

// make the name coherent with each other
export default {
  addItem,
  deleteItem,

  retrieveRouteine,
  initializeRouteine,

  getFavourites,
  addFavourite,
  removeFavourite,
  clearFavourites,

  getProfile,
  updateProfile,
};
