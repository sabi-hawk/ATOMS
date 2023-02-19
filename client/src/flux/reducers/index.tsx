import { combineReducers } from "redux";
import scrappedDataReducer from "./scrappedData";
import searchInfoReducer from "./searchData";
import chatReducer from "./chats";
import authReducer from "./auth";
import storage from "redux-persist/lib/storage";
import { AtomState } from "../store";

// const initialState = {
//   scrappedData: {},
//   search: {},
//   chats: {},
//   auth: {},
//   _persist: {},
// };
const initialState = {};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "RESET_STATE":
      storage.removeItem("persist:root");
      return initialState;
    default:
      return state;
  }
};

const appReducer = combineReducers({
  root: rootReducer,
  scrappedData: scrappedDataReducer,
  search: searchInfoReducer,
  chats: chatReducer,
  auth: authReducer,
});

// const rootReducer = (state: AtomState, action: any) => {
//   switch (action.type) {
//     case LOGOUT:
//       storage.removeItem("persist:root");
//       return initialState;
//     default:
//       return appReducer(state, action);
//   }
// };

export const LOGOUT = "LOGOUT";
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
export default appReducer;

// const appReducer = {
//   scrappedData: scrappedDataReducer,
//   search: searchInfoReducer,
//   chats: chatReducer,
//   auth: authReducer,
// };

// export default combineReducers(appReducer);
