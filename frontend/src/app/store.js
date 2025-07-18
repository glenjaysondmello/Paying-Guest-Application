import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import scrollReducer from "../features/scroll/scrollSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import pgReducer from "../features/pgslice/pgSlice";
import searchPgReducer from "../features/search/searchPgSlice";
import paymentReducer from "../features/payment/paymentSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  scroll: scrollReducer,
  sidebar: sidebarReducer,
  pg: pgReducer,
  search: searchPgReducer,
  pay: paymentReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
