import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { nameApi, genderApi, countryApi } from './services';

const store = configureStore({
  reducer: {
    [nameApi.reducerPath]: nameApi.reducer,
    [genderApi.reducerPath]: genderApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      nameApi.middleware,
      genderApi.middleware,
      countryApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
