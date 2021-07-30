import React, { useContext } from "react";
import actions from "./actions";
import GlobalContext from "./context";

export const ADD_NEW_DATE = "ADD_NEW_DATE";
export const ADD_FOOD = "ADD_FOOD";
export const REMOVE_FOOD = "REMOVE_FOOD";
export const ADD_DATA = "ADD_DATA";

const reducer = (state, action) => {
  console.log("ACTION: " + action.type);
  switch (action.type) {
    case ADD_NEW_DATE:
      return actions.addNewDate(state, action);
    case ADD_DATA:
      return actions.addData(state, action);
    case ADD_FOOD:
      return actions.addFood(state, action);
    case REMOVE_FOOD:
      return actions.removeFood(state, action);

    default:
      break;
  }
  return state;
};

class GlobalProvider extends React.Component<{}, {}> {
  state = {
    data: {},
  };
  _reducer = reducer;
  dispatch = (action) => this.setState(this._reducer(this.state, action));
  render() {
    console.log(this.state);
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

export const useGlobal = () => useContext<{ state; dispatch }>(GlobalContext);

export default GlobalProvider;
