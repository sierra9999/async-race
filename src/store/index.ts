import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/api/baseApi';
import garageUiReducer from './garageUiSlice';
import winnersUiReducer from './winnersUiSlice';
import raceReducer from './raceSlice';

export const store = configureStore({
  reducer: {
    garageUi: garageUiReducer,
    winnersUi: winnersUiReducer,
    race: raceReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
