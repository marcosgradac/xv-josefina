import { lazy, Suspense } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { muiTheme } from './theme/muiTheme';
import Invitation from './components/Invitation';
import './App.css';
const AdminPage = lazy(() => import('./admin/AdminPage'));
export default function App() {
  return <ThemeProvider theme={muiTheme}><CssBaseline/><BrowserRouter><Routes><Route path="/admin/*" element={<Suspense fallback={<p role="status">Cargando administrador…</p>}><AdminPage/></Suspense>}/><Route path="*" element={<Invitation/>}/></Routes></BrowserRouter></ThemeProvider>;
}
