import React, { useContext } from "react";
import { State } from "../interface";
import log from "../log";
import GlobalContext from "./context";
import reducers from "./reducers";

const initialState: State = {
  data: null,
  favourites: [],
  app_date: null,
  new_date_loading: false,
  first_time: {
    value: null,
    created_at: null,
    version: null,
  },
};

class GlobalProvider extends React.Component<{}, State> {
  state = initialState;
  _reducer = reducers;
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

export const withGlobal = (Component) => {
  return (props) => {
    const { state, dispatch } = useGlobal();
    return <Component state={state} dispatch={dispatch} {...props} />;
  };
};

export default GlobalProvider;
