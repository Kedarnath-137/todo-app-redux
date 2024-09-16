
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo, updateTodoById } from '../redux/todoSlice';
import { Checkbox, Button, ListItem, ListItemText, TextField } from '@mui/material';
import styled from 'styled-components';

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todo);

  const handleToggle = () => {
    if (todo.id >= 1000000000) {
      dispatch(updateTodo({ id: todo.id, completed: !todo.completed }));
    } else {
      dispatch(updateTodoById({ id: todo.id, updatedTodo: { todo: todo.todo, completed: !todo.completed } }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (todo.id >= 1000000000) {
      dispatch(updateTodo({ id: todo.id, todo: editedText }));
    } else {
      dispatch(updateTodoById({ id: todo.id, updatedTodo: { todo: editedText, completed: todo.completed } }));
    }
    setIsEditing(false);
  };

  return (
    <StyledListItem>
      <Checkbox checked={todo.completed} onChange={handleToggle} />
      {isEditing ? (
        <TextField
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          fullWidth
        />
      ) : (
        <ListItemText primary={todo.todo} />
      )}
      {isEditing ? (
        <StyledButton variant="contained" color="primary" onClick={handleSave}>
          Save
        </StyledButton>
      ) : (
        <StyledButton variant="contained" onClick={handleEdit}>
          Edit
        </StyledButton>
      )}
      <StyledButton variant="contained" color="secondary" onClick={handleDelete}>
        Delete
      </StyledButton>
    </StyledListItem>
  );
};

export default TodoItem;








