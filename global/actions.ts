import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDate } from "../interface";

// run it in cache everytime if not date

// storing system: AsyncStorage(date, data)
// retirve initial data form the storage through a function which runs in the cahce

const isDate = (state, date) => state.data[date];

const addTodayDate = (state, action) => {
  const date = new Date();
  const id_date =
    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  if (isDate(state, id_date)) return;

  // update the phone storage directly too.

  return {
    ...state,
    data: {
      ...state.data,
      [id_date]: defaultDate,
    },
  };
};

const addTodayData = (state, action) => {
  return {
    ...state,
    data: {
      ...state.data,
      [todayDate()]: action.payload,
    },
  };
};

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

export const setDefaultDate = () => defaultDate;

export const todayDate = () => {
  const date = new Date();
  const id_date =
    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

  return id_date;
};

export const updateData = async (date, state, dispatch) => {
  try {
    await AsyncStorage.setItem(date, state.data[date]);
    dispatch();
  } catch (error) {
    console.log(error.message);
  }
};
/// Local

export default {
  addTodayDate,
  addFood,
  removeFood,
  defaultDate,
  addTodayData,
};
