import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import { TextField, Button } from '@mui/material';

const AddTodo = () => {
  const [todo, setTodo] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      // Assigning a unique ID for local todos (larger than typical IDs from API)
      const newTodo = {
        id: Date.now(),
        todo: todo.trim(),
        completed: false
      };
      dispatch(addTodo(newTodo));
      setTodo(''); // Clear input field after adding
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="New Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Todo
      </Button>
    </form>
  );
};

export default AddTodo;

