import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos";

export const store = configureStore({
  reducer: {
    todos,
  },
});

//store의 타입 , dispatch의 타입
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
