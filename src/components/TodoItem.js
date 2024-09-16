import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo, updateTodoById } from '../redux/todoSlice';
import { Checkbox, Button, ListItem, ListItemText, TextField, Grid, Box } from '@mui/material';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todo);

  // Toggle the completed status
  const handleToggle = () => {
    dispatch(updateTodo({ id: todo.id, todo: todo.todo, completed: !todo.completed }));
  };

  // Delete the todo
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  // Enable edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save the edited todo
  const handleSave = () => {
    dispatch(updateTodoById({ id: todo.id, updatedTodo: { todo: editedText, completed: todo.completed } }));
    setIsEditing(false); // Exit edit mode
  };

  return (
    <ListItem>
      <Grid container alignItems="center" spacing={2}>
        {/* Checkbox */}
        <Grid item xs={1}>
          <Checkbox checked={todo.completed} onChange={handleToggle} />
        </Grid>
        
        {/* Todo Text or Edit Input */}
        <Grid item xs={6}>
          {isEditing ? (
            <TextField
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              autoFocus
            />
          ) : (
            <ListItemText primary={todo.todo} />
          )}
        </Grid>
        
        {/* Action Buttons */}
        <Grid item xs={5}>
          <Box display="flex" justifyContent="flex-end" gap={1}>
            {isEditing ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSave}
                sx={{ minWidth: '70px' }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={handleEdit}
                sx={{ minWidth: '70px' }}
              >
                Edit
              </Button>
            )}

            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleDelete}
              sx={{ minWidth: '70px' }}
            >
              Delete
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default TodoItem;
