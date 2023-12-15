import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TodoType } from "../../types/types";
import type { RootState } from "../config/configStore";

const initialState: TodoType[] = [];

//TODO : delete toggle 개선
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodoType[]>) => {
      return [...action.payload]; // 배열을 풀었다 묶어서 새거로 만들기?
    },

    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.push(action.payload);
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      const newTodos = state.filter((todo) => todo.id !== action.payload);
      return newTodos;
    },

    toggleDone: (state, action: PayloadAction<string>) => {
      const newTodos = state.map((todo) => {
        if (todo.id === action.payload)
          return { ...todo, isDone: !todo.isDone };
        else return todo;
      });
      return newTodos;
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { setTodos, addTodo, deleteTodo, toggleDone } = todosSlice.actions;

// store에서.. todos를 꺼낼 수 있게??
export const selectTodo = (state: RootState) => state.todos;

// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default todosSlice.reducer;
