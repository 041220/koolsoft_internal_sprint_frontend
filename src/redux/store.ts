import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ColumnSlice from './slices/ColumnSlice';
import SprintSlice from './slices/SprintSlice';


export const store = configureStore({
  reducer: {
    oneColumn: ColumnSlice.reducer,
    oneSprint: SprintSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
