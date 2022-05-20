import React, { useState, useEffect, createContext, useContext } from "react";
import ResponsiveAppBar from "../../layouts/Header"
import StickyFooter from "../../layouts/Footer"
import useTool from "../../context/ExpensesContext"

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import HelpIcon from '@mui/icons-material/Help';
import Grid from '@mui/material/Grid';
import DatePicker from '@mui/lab/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function FormTwo() {

  const [amount, setAmount] = useState()
  const [numberOfKm, setNumberOfKm] = useState()

  const {expenses, addExpense} = useTool()


  const handleClick = () => {
    addExpense({
      firstname: "joeline",
      expenses: [
      amount: amount,
      numberOfKm: numberOfKm
    ]})
  }


  return  (
    <div>
      <TextField
        required
        id="outlined-required"
        label="Amount"
        type="number"
        name="amount"
        onChange={(event) => setAmount(event.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="numberOfKm"
        type="number"
        name="amount"
        onChange={(event) => setNumberOfKm(event.target.value)}
      />

      <button
      onClick={handleClick}
      >ClickMe</button>

      {expenses.map((expense, index) =>
        <div>
          <p key={index}>{expense.firstname}</p>
          <p key={index}>{expense.expenses}</p>
        </div>
      )}


    </div>

  )
}

export default FormTwo
