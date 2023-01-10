import {
  configureStore,
  applyMiddleware,
  compose,
} from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

export default store;