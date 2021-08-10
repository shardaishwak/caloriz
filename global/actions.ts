import { AppDate } from "../interface";

const newDateLoading = (state, action) => {
  return {
    ...state,
    new_date_loading: action.payload || !state.new_date_loading,
  };
};

/**
 * @description Set the app date
 * @param state
 * @param date
 */
const setAppDate = (state, { date }) => ({
  ...state,
  app_date: date,
});

/** =========================== ROUTEINE RECORD ================ */

/**
 * @connect db.initializeRouteine
 * @description Add a new date to the state
 * @param state
 */
const addNewDate = (state, _) => {
  return {
    ...state,
    data: setDefaultDate(),
  };
};

/**
 * @connect db.retrieveRouteine
 * @description Load a daily routeine data
 * @param state
 * @param action {payload}
 */
const addData = (state, { payload }) => {
  return {
    ...state,
    data: payload,
  };
};

/**
 * @connect db.addItem
 * @description Add a new item to the state;
 * @param state
 * @param payload { field, data}
 */
const addFood = (state, { payload: { date, field, data } }) => {
  return {
    ...state,
    data: {
      ...state.data,
      [field]: [...state.data[field], data],
    },
  };
};

/**
 * @connect db.deleteItem
 * @description Remove a food from the state
 * @param state
 * @param action { field, id}
 * @returns new state
 */
const removeFood = (state, { payload: { field, id } }) => {
  const new_field = [...state.data[field]];
  const index = new_field.findIndex((a) => a.id === id);
  if (index < 0) return;
  new_field.splice(index, 1);

  return {
    ...state,
    data: {
      ...state.data,

      [field]: new_field,
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

export default {
  newDateLoading,
  setAppDate,
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
