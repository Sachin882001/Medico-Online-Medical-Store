import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
// Optionally import redux-persist
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// Optional: Set up redux-persist configuration
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    cart: cartSlice, // Or use persistedReducer for persistence
  },
  devTools: true, // Enable Redux DevTools extension
});

// Optional: Create a persistor for redux-persist
// export const persistor = persistStore(store);
