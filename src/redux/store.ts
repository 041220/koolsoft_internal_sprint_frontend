import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import SprintSlice from './slices/SprintSlice';
import TasksSlice from './slices/TasksSlice';


export const store = configureStore({
  reducer: {
    oneSprint: SprintSlice.reducer,
    allTask: TasksSlice.reducer,
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
