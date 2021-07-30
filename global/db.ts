import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDefaultDate } from "./actions";

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

export default {
  addItem,
  deleteItem,
  retrieveRouteine,
  initializeRouteine,
};
