import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from './theme/muiTheme';
import Invitation from './components/Invitation';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Invitation />
    </ThemeProvider>
  );
}

export default App;
﻿
