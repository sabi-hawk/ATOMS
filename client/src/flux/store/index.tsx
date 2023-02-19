import {
  configureStore,
  applyMiddleware,
  compose,
  Store,
} from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

// function saveToLocalStorage(store: any) {
//   try {
//     const serializedStore = JSON.stringify(store);
//     window.localStorage.setItem("store", serializedStore);
//   } catch (error) {
//     console.log("Error | Redux Store | saveToLocalStorage", error);
//   }
// }

// function loadFromLocalStorage() {
//   try {
//     const serializedStore = window.localStorage.getItem("store");
//     if (serializedStore === null) return undefined;
//     return JSON.parse(serializedStore);
//   } catch (error) {}
// }

// const persistedState = loadFromLocalStorage();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
  devTools: true,
  // preloadedState: persistedState,
});

// store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
export const persister = persistStore(store);
export type AtomState = ReturnType<typeof store.getState>;
