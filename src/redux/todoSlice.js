import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://dummyjson.com/todos');
  return response.data.todos;
});

// Thunk for updating a todo by ID
export const updateTodoById = createAsyncThunk('todos/updateTodoById', async ({ id, updatedTodo }) => {
  const response = await axios.put(`https://dummyjson.com/todos/${id}`, updatedTodo);
  return response.data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',
    error: null
  },
  reducers: {
    // Add a new todo
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    // Update the todo text and/or the completed status
    updateTodo: (state, action) => {
      const { id, todo, completed } = action.payload;
      const existingTodo = state.todos.find(t => t.id === id);
      if (existingTodo) {
        // Update text if provided, else retain the old one
        existingTodo.todo = todo || existingTodo.todo;
        // Update completed status if provided
        existingTodo.completed = completed !== undefined ? completed : existingTodo.completed;
      }
    },
  
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle the result of fetching todos
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      // Handle the result of updating a todo by ID
      .addCase(updateTodoById.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const existingTodo = state.todos.find(todo => todo.id === updatedTodo.id);
        if (existingTodo) {
          existingTodo.todo = updatedTodo.todo;
          existingTodo.completed = updatedTodo.completed;
        }
      });
  }
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
