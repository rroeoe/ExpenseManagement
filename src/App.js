import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form/Form";
import { ExpensesProvider } from "./context/ExpensesContext";


const font = "'Inter', sans-serif;"

const theme = createTheme({
  palette: {

  },
  typography: {
    fontFamily: font
  },
});


function App(){

  return(
  <ThemeProvider theme={theme}>
    <ExpensesProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Form />} />
            </Routes>
        </BrowserRouter>
    </ExpensesProvider>
  </ThemeProvider>
)};

  export default App
