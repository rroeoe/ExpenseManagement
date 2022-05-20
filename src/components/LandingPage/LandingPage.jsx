import React, { useState, useEffect, createContext } from "react";
import ResponsiveAppBar from "../../layouts/Header"
import StickyFooter from "../../layouts/Footer"

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

function LandingPage() {

  return (
    <Container fixed sx={{ mt: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <p>Hallo. Hier kannst du deine Spesen eingeben.</p>
          <Button
            variant="contained"
            href="Form"
            >Start App
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LandingPage;
