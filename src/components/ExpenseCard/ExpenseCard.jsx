import React, { useState, useEffect, createContext, useContext } from "react";
import ResponsiveAppBar from "../../layouts/Header"
import StickyFooter from "../../layouts/Footer"
import useTool from "../../context/ExpensesContext"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import "./ExpenseCard.css"
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ExpenseCard = ({ uniqueId, date, account, amount, mwst, image, description, numberOfKm }) => {
  const { expenses, addExpense, removeExpense } = useTool();
  const [deleteOpen, setDeleteOpen] = useState(false)


  const handleClickOpen = () => {
  setDeleteOpen(true);
};

const handleClose = () => {
  setDeleteOpen(false);
};

const handleCloseDelete = () => {
  setDeleteOpen(false);
  const expense = { uniqueId, date, account, amount, mwst, image, description, numberOfKm }
  removeExpense(expense)
};


  function convertDate(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join(".");
  }

return (
  <Grid container spacing={0} className={"expenseCard"}>
    <Grid item xs={3}>
      <div className="img-box">
        <img src={image} width={190} height={250} className="img"/>
        <Typography>
          <div className="preview">Preview</div>
        </Typography>
      </div>
    </Grid>

    <Grid item xs={8}>
      <Grid container spacing={1}>

        <Grid item xs={12}>
          <Typography>
            <h5 className="date">{convertDate(date)}</h5>
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography>
            <h3>CHF {Number(amount).toFixed(2)}</h3>
          </Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography>
            <h3>{account}</h3>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            <div className="description" style={{ wordBreak: "break-word" }}>{description}</div>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            {mwst == "0%" ? (<div></div>) : (<div className="chips">MWST: {mwst}</div>)}
          </Typography>
        </Grid>

      </Grid>
    </Grid>
    <Grid item xs={1}>
      <IconButton aria-label="delete" size="large">
        <DeleteIcon
        onClick={handleClickOpen}
        fontSize="inherit" />
      </IconButton>
    </Grid>
    <Dialog
        open={deleteOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm to delete this entry."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  </Grid>
)
}

export default ExpenseCard
