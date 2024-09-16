
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
      dispatch(addTodo({ id: Date.now(), todo, completed: false }));
      setTodo('');
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

