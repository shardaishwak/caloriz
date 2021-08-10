import React, { useContext } from "react";
import { CommonItem, State } from "../interface";
import log from "../log";
import actions from "./actions";
import GlobalContext from "./context";

export const NEW_DATE_LOADING = "NEW_DATE_LOADING";
export const SET_APP_DATE = "SET_APP_DATE";
export const ADD_NEW_DATE = "ADD_NEW_DATE";
export const ADD_FOOD = "ADD_FOOD";
export const REMOVE_FOOD = "REMOVE_FOOD";
export const ADD_DATA = "ADD_DATA";
export const INITIALIZE_FAVOURITES = "INITIALIZE_FAVOURITES";
export const SET_FAVOURITE = "SET_FAVORITE";
export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
export const CLEAR_FAVOURITES = "CLEAR_FAVOURITES";

const reducer = (state, action) => {
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

    default:
      break;
  }
  return state;
};

class GlobalProvider extends React.Component<{}, State> {
  state = {
    data: null,
    favourites: [],
    app_date: null,
    new_date_loading: false,
  };
  _reducer = reducer;
  dispatch = (action) => this.setState(this._reducer(this.state, action));
  render() {
    log("[STATE]", this.state);
    return (
      <GlobalContext.Provider
        value={{
          state: this.state,
          dispatch: this.dispatch,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export const useGlobal = () =>
  useContext<{
    state: State;
    dispatch;
  }>(GlobalContext);

export default GlobalProvider;
