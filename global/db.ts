import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonItem } from "../interface";
import { setDefaultDate } from "./actions";

/** ============================ ITEM ================================ */

/**
 * @description Retrieve daily routine data
 * @param date
 * @returns daily routeine data;
 */
const retrieveRouteine = async (date) =>
  JSON.parse(await AsyncStorage.getItem(date));

const initializeRouteine = async (date) =>
  await AsyncStorage.setItem(date, JSON.stringify(setDefaultDate()));

/**
 * @description Add a new item to the routeine
 * @param state
 * @param date
 * @param field
 * @param data
 * @returns undefined
 */
const addItem = async (state, date, field, data) =>
  await AsyncStorage.setItem(
    date,
    JSON.stringify({
      ...state.data[date],
      breakfast: [...state.data[date][field], { ...data }],
    })
  );

/**
 * @description delete an item from routeine
 * @param state
 * @param date
 * @param field
 * @param id
 */
const deleteItem = async (state, date, field, id) => {
  const field_data = state.data[date][field];
  const index = field_data.findIndex((a) => a.id === id);
  field_data.splice(index, 1);
  await AsyncStorage.setItem(
    date,
    JSON.stringify({
      ...state.data[date],
      breakfast: field_data,
    })
  );
};

/** ================================ FAVOURITE ================================== */

/**
 * @description Get the list of all the starred items
 * @returns favourites list
 */
const getFavourites = async () =>
  (JSON.parse(await AsyncStorage.getItem("favourites")) ||
    []) as Array<CommonItem>;

/**
 * @description Add an item to the favourite list
 * @param item: CommonItem
 */
const addFavourite = async (item: CommonItem) => {
  const favourites = await getFavourites();
  favourites.push(item);
  await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
};

/**
 * @description Remove an item from favourite list
 * @param id (item)
 */
const removeFavourite = async (food_name, calories) => {
  const favourites = await getFavourites();
  const index = favourites.findIndex(
    (a) => a.food_name === food_name && a.calories === calories
  );
  favourites.splice(index, 1);
  await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
};
export default {
  addItem,
  deleteItem,
  retrieveRouteine,
  initializeRouteine,
  getFavourites,
  addFavourite,
  removeFavourite,
};
