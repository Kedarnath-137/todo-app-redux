

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch todos from the API
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://dummyjson.com/todos');
  return response.data.todos;
});

// Update todo by ID in the backend
export const updateTodoById = createAsyncThunk('todos/updateTodoById', async ({ id, updatedTodo }) => {
  const response = await axios.put(`https://dummyjson.com/todos/${id}`, updatedTodo);
  return response.data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [], // List of todos
    status: 'idle', // Status for API calls
    error: null // Error handling
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload); // Add the new todo
    },
    // Local update for todo (without calling API)
    updateTodo: (state, action) => {
      const { id, todo, completed } = action.payload;
      const existingTodo = state.todos.find((t) => t.id === id);
      if (existingTodo) {
        existingTodo.todo = todo || existingTodo.todo; // Update text if provided
        existingTodo.completed = completed !== undefined ? completed : existingTodo.completed; // Update completed status if provided
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch todos
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      // Handle updateTodoById API response
      .addCase(updateTodoById.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const existingTodo = state.todos.find((todo) => todo.id === updatedTodo.id);
        if (existingTodo) {
          existingTodo.todo = updatedTodo.todo;
          existingTodo.completed = updatedTodo.completed;
        }
      });
  }
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;




