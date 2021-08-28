import log from "../log";
import actions from "./actions";
import {
  ADD_DATA,
  ADD_FOOD,
  ADD_NEW_DATE,
  CLEAR_FAVOURITES,
  GET_PROFILE,
  INITIALIZE_FAVOURITES,
  NEW_DATE_LOADING,
  REMOVE_FAVOURITE,
  REMOVE_FOOD,
  SET_APP_DATE,
  SET_FAVOURITE,
  UPDATE_PROFILE,
} from "./constraints";

const reducers = (state, action) => {
  log("[ACTION] ", action.type);
  switch (action.type) {
    case NEW_DATE_LOADING:
      return actions.newDateLoading(state, action);

    case SET_APP_DATE:
      return actions.setAppDate(state, action);
    case ADD_NEW_DATE:
      return actions.addNewDate(state, action);
    case ADD_DATA:
      return actions.addData(state, action);

    case ADD_FOOD:
      return actions.addFood(state, action);
    case REMOVE_FOOD:
      return actions.removeFood(state, action);

    case INITIALIZE_FAVOURITES:
      return actions.initializeFavourites(state, action);
    case SET_FAVOURITE:
      return actions.setFavourite(state, action);
    case REMOVE_FAVOURITE:
      return actions.removeFavourite(state, action);
    case CLEAR_FAVOURITES:
      return actions.clearFavourites(state, action);

    case GET_PROFILE:
      return actions.getProfile(state, action);
    case UPDATE_PROFILE:
      return actions.updateProfile(state, action);

    default:
      break;
  }
  return state;
};

export default reducers;
