import React, {useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form"
import FormTwo from "./components/FormTwo/FormTwo"
import FAQ from "./components/FAQ/FAQ"
import Help from "./components/Help/Help"
import LandingPage from "./components/LandingPage/LandingPage"
import { ExpensesProvider } from "./context/ExpensesContext"
import ResponsiveAppBar from "./layouts/Header"
import StickyFooter from "./layouts/Footer"

function App(){

  return(
  <ExpensesProvider>
    <ResponsiveAppBar />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="Form" element={<Form />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="help" element={<Help />} />
          </Routes>
      </BrowserRouter>

  </ExpensesProvider>
)};

  export default App
