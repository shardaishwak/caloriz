import { createContext } from "react";

const GlobalContext = createContext({ state: null, dispatch: null });

export default GlobalContext;
