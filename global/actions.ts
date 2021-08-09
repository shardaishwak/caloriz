import { AppDate } from "../interface";

/** =========================== ITEM ================ */
/**
 * @description check date availability in the state
 * @param state
 * @param date
 * @returns boolean
 */
const isDate = (state, date) => state.data[date];

/**
 * @connect db.initializeRouteine
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
 * @connect db.retrieveRouteine
 * @description Load a daily routeine data
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
 * @connect db.addItem
 * @description Add a new item to the state;
 * @param state
 * @param payload {date, field, data}
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
 * @connect db.deleteItem
 * @description Remove a food from the state
 * @param state
 * @param action {date, field, id}
 * @returns new state
 */
const removeFood = (state, { payload: { date, field, id } }) => {
  const new_field = [...state.data[date][field]];
  const index = new_field.findIndex((a) => a.id === id);
  if (index < 0) return;
  new_field.splice(index, 1);

  return {
    ...state,
    data: {
      ...state.data,
      [date]: {
        ...state.data[date],
        [field]: new_field,
      },
    },
  };
};

/* ===================== FAVORITE ===========================*/
/**
 * @connect db.getFavourites
 * @description Load the favourites list
 * @param state
 * @param payload {data}
 * @returns undefined
 */

const initializeFavourites = (state, { data }) => {
  return {
    ...state,
    favourites: data,
  };
};

/**
 * @connect db.addFavourite
 * @description Add a new item to state
 * @param state
 * @param payload {item}
 * @returns undefined
 */
const setFavourite = (state, { item }) => {
  return {
    ...state,
    favourites: [...state.favourites, item],
  };
};

/**
 * @connect db.removeFavourite
 * @description Remove a favourite item from list
 * @param state
 * @param payload {food_name, calories}
 * @returns
 */
const removeFavourite = (state, { food_name, calories }) => {
  const favourites = state.favourites;
  const index = favourites.findIndex(
    (a) => a.food_name === food_name && a.calories === calories
  );
  favourites.splice(index, 1);
  return {
    ...state,
    favourites,
  };
};

/**
 * @connect db.clearFavourites
 * @description Clear all the favourite list from the state
 */
const clearFavourites = (state, action) => ({
  ...state,
  favourites: [],
});

// Default routeine data model
const defaultDate: AppDate = {
  breakfast: [], // | Array<BrandedItem>
  second_breakfast: [],
  lunch: [],
  snack: [],
  dinner: [],
  dessert: [],
  extra: [],
  water: {
    cup_size: null,
    cup_qty: 0,
  },
};

/**
 *@description Return the default values
 * @returns data modal
 */
export const setDefaultDate = () => defaultDate;

/**
 *@description Return fomatted string of date as ID
 * @returns string
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
  initializeFavourites,
  setFavourite,
  removeFavourite,
  clearFavourites,
};
