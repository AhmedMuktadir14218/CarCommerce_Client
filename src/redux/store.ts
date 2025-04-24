// import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
// import authReducer from './features/auth/authSlice';  // Your authentication slice
// import { authApi } from './features/auth/authApi';  // API for authentication
// import { carApi } from './features/auth/carApi';  // API for managing cars
// import { orderApi } from './features/auth/orderApi';  // API for managing orders
// import storage from 'redux-persist/lib/storage';  // For persistent storage (localStorage for web)
// import { persistReducer, persistStore } from 'redux-persist';

// // Redux Persist configuration for the auth state
// const persistConfig = {
//   key: 'auth',
//   storage,  // Using localStorage by default
// };

// // Persist the auth reducer with Redux Persist
// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// // Configure the store with multiple API reducers and persistent authentication state
// export const store = configureStore({
//   reducer: {
//     [authApi.reducerPath]: authApi.reducer,  // Authentication API
//     [carApi.reducerPath]: carApi.reducer,  // Car management API
//     [orderApi.reducerPath]: orderApi.reducer,  // Order management API
//     auth: persistedAuthReducer,  // Persistent authentication reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,  // Disable serializability check for non-serializable values like functions
//     }).concat(
//       authApi.middleware,  // Adding middleware for auth API
//       carApi.middleware,  // Adding middleware for car API
//       orderApi.middleware  // Adding middleware for order API
//     ),
// });

// // Setting up listeners for the store (needed for features like polling or refetching)
// setupListeners(store.dispatch);

// // Create the persistor to manage the persisted state
// export const persistor = persistStore(store);

// // Export types for the state and dispatch for TypeScript
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './features/auth/authSlice';  // Your authentication slice
import { authApi } from './features/auth/authApi';  // API for authentication
import { carApi } from './features/auth/carApi';  // API for managing cars
import { orderApi } from './features/auth/orderApi';  // API for managing orders
import storage from 'redux-persist/lib/storage';  // For persistent storage (localStorage for web)
import { persistReducer, persistStore } from 'redux-persist';
import carReducer from './features/auth/carSlice';  // Import the new car slice

// Redux Persist configuration for the auth state
const persistConfig = {
  key: 'auth',
  storage,  // Using localStorage by default
};

// Persist the auth reducer with Redux Persist
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the store with multiple API reducers and persistent authentication state
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,  // Authentication API
    [carApi.reducerPath]: carApi.reducer,  // Car management API
    [orderApi.reducerPath]: orderApi.reducer,  // Order management API
    auth: persistedAuthReducer,  // Persistent authentication reducer
    car: carReducer,  // Add the car slice for car management
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable serializability check for non-serializable values like functions
    }).concat(
      authApi.middleware,  // Adding middleware for auth API
      carApi.middleware,  // Adding middleware for car API
      orderApi.middleware  // Adding middleware for order API
    ),
});

// Setting up listeners for the store (needed for features like polling or refetching)
setupListeners(store.dispatch);

// Create the persistor to manage the persisted state
export const persistor = persistStore(store);

// Export types for the state and dispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
