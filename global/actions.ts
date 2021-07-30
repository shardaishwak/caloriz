import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDate } from "../interface";

// run it in cache everytime if not date

// storing system: AsyncStorage(date, data)
// retirve initial data form the storage through a function which runs in the cahce

/**
 * @description check date availability in the state
 * @param state
 * @param date
 * @returns boolean
 */
const isDate = (state, date) => state.data[date];

/**
 * @description Add a new date to the state
 * @param state
 * @param action {date}
 * @returns new state
 */
const addNewDate = (state, { date }) => {
  if (isDate(state, date)) return;

  // update the phone storage directly too.

  return {
    ...state,
    data: {
      ...state.data,
      [date]: defaultDate,
    },
  };
};

/**
 * @description Add a daily routeine data
 * @param state
 * @param action {payload, date}
 * @returns
 */
const addData = (state, { payload, date }) => {
  return {
    ...state,
    data: {
      ...state.data,
      [date]: payload,
    },
  };
};

/**
 * @description Add a new item to the state;
 * @param state
 * @param action {date, field data}
 * @returns new state
 */
const addFood = (state, { payload: { date, field, data } }) => {
  return {
    data: {
      ...state.data,
      [date]: {
        ...state.data[date],
        [field]: [...state.data[date][field], data],
      },
    },
  };
};

/**
 * @description Remove a food from the state
 * @param state
 * @param action {date, field, id}
 * @returns new state
 */
const removeFood = (state, { payload: { date, field, id } }) => {
  const index = state.data[date][field].findIndex((a) => a.id === id);
  if (!index) return;

  return {
    ...state,
    data: {
      ...state.data,
      [date]: {
        ...state.data[date],
        [field]: state.data[date][field].splice(index, 1),
      },
    },
  };
};

// Default routeine data model
const defaultDate: AppDate = {
  breakfast: [], // | Array<BrandedItem>
  second_break_fast: [],
  lunch: [],
  snack: [],
  dinner: [],
  dessert: [],
  total_fat: 0,
  total_calories: 0,
  total_proteins: 0,
  total_sugars: 0,
  water: {
    cup_size: null,
    cup_qty: 0,
  },
};

/**
 *
 * @returns default routeine data model
 */
export const setDefaultDate = () => defaultDate;

/**
 *
 * @returns formatted current date
 */
export const todayDate = () => {
  const date = new Date();
  const id_date =
    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

  return id_date;
};

export default {
  addNewDate,
  addFood,
  removeFood,
  defaultDate,
  addData,
};
