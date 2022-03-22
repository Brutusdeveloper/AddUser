import todoApp from "./Reducers/CommonReducers";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, todoApp);

export let store = createStore(persistedReducer);
export let persistor = persistStore(store);