import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  isLoading: false,
  todos: [],
  hasError: false,
};

export const fetchTodos = createAsyncThunk("fetchTods", async () => {
  try {
    let response = await axios.get("https://dummyjson.com/todos");
    console.log(response.data);
    return response.data.todos;
  } catch (error) {
    console.log(error);
  }
});

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => {
        return todo.id != action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    });

    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
