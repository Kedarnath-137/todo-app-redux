
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { Container, Typography, CssBaseline, createTheme, ThemeProvider } from '@mui/material';

const customTheme = createTheme({
  palette: {
    background: {
      default: '#e0f7fa'  
    },
    text: {
      primary: '#37474f',  
    },
    primary: {
      main: '#1976d2',  
    },
    secondary: {
      main: '#e53935',  
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',  
        },
      },
    },
  },
});




function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />  
      <Container maxWidth="sm" sx={{ bgcolor: 'background.default', minHeight: '100vh', padding: '16px' }}>
      
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: 'text.primary' }}  
        >
          Todo App
        </Typography>
       
        <AddTodo />
       
        <TodoList />
      </Container>
    </ThemeProvider>
  </Provider>
  );
}

export default App;

