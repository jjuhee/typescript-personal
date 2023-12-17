import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TodoType } from "../../types/types";
import type { RootState } from "../config/configStore";
import { SERVER_URL } from "../../components/TodoList";
import axios from "axios";

interface stateType {
  todos: TodoType[];
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const initialState: stateType = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  "getTodos",

  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(SERVER_URL);
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addTodo = createAsyncThunk(
  "addTodo",

  async (payload: TodoType, thunkAPI) => {
    try {
      await axios.post(SERVER_URL, payload);
      console.log("__addTodo", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "deleteTodo",

  async (payload: string, thunkAPI) => {
    try {
      await axios.delete(`${SERVER_URL}/${payload}`);
      console.log("__deleteTodo", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __toggleDone = createAsyncThunk(
  "toggleDone",

  async ({ id, isDone }: { id: string; isDone: boolean }, thunkAPI) => {
    try {
      await axios.patch(`${SERVER_URL}/${id}`, { isDone: isDone });
      console.log("__toggleDone", id, isDone);
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload;
    },

    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.push(action.payload);
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = newTodos;
    },

    toggleDone: (state, action: PayloadAction<string>) => {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload)
          return { ...todo, isDone: !todo.isDone };
        else return todo;
      });
      state.todos = newTodos;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getTodos.pending, (state, { payload }) => {
      console.log("pending: ", payload);
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__getTodos.fulfilled, (state, { payload }) => {
      console.log("fullfiled: ", payload);
      state.todos = payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(__getTodos.rejected, (state, { payload }) => {
      console.log("rejected: ", payload);
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    });
    builder.addCase(__addTodo.pending, (state, { payload }) => {
      console.log("pending: ", payload);
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__addTodo.fulfilled, (state, { payload }) => {
      console.log("fullfiled: ", payload);
      state.todos.push(payload);
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(__addTodo.rejected, (state, { payload }) => {
      console.log("rejected: ", payload);
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    });
    builder.addCase(__deleteTodo.pending, (state, { payload }) => {
      console.log("pending: ", payload);
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__deleteTodo.fulfilled, (state, { payload }) => {
      console.log("fullfiled: ", payload);
      const newTodos = state.todos.filter((todo) => todo.id !== payload);
      state.todos = newTodos;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(__deleteTodo.rejected, (state, { payload }) => {
      console.log("rejected: ", payload);
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    });
    builder.addCase(__toggleDone.pending, (state, { payload }) => {
      console.log("pending: ", payload);
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__toggleDone.fulfilled, (state, { payload }) => {
      console.log("fullfiled: ", payload);
      const newTodos = state.todos.map((todo) => {
        if (todo.id === payload) return { ...todo, isDone: !todo.isDone };
        else return todo;
      });
      state.todos = newTodos;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(__toggleDone.rejected, (state, { payload }) => {
      console.log("rejected: ", payload);
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    });
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { setTodos, addTodo, deleteTodo, toggleDone } = todosSlice.actions;

// store에서.. todos를 꺼낼 수 있게??
export const selectTodo = (state: RootState) => state.todos;

// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default todosSlice.reducer;
