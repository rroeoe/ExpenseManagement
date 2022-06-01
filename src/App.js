import React, {useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Form from "./components/Form/Form"
import FAQ from "./components/FAQ/FAQ"
import LandingPage from "./components/LandingPage/LandingPage"
import ExpenseCard from "./components/ExpenseCard/ExpenseCard"
import { ExpensesProvider } from "./context/ExpensesContext"
import ResponsiveAppBar from "./layouts/Header"
import StickyFooter from "./layouts/Footer"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';


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
      <ResponsiveAppBar />
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="Form" element={<Form />} />
              <Route path="faq" element={<FAQ />} />
            </Routes>
        </BrowserRouter>
    </ExpensesProvider>
  </ThemeProvider>
)};

  export default App
