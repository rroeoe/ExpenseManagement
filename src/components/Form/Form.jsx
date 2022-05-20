import React, {useContext, useState, useEffect} from 'react';

//Local Files
import ExpenseCard from "../ExpenseCard/ExpenseCard"
import "./Form.css"

//Context
import useTool from "../../context/ExpensesContext"

//MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import HelpIcon from '@mui/icons-material/Help';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import Fab from '@mui/material/Fab';

//Icons
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

//jsPDF
import { jsPDF } from "jspdf";
import 'jspdf-autotable'





const Form = () => {

  //useReducer
  const {expenses, addExpense, removeExpense, updateTotal, total} = useTool()

  //Data labels
  const [firstname, setFirstname] = useState("")
  const [secondname, setSecondname] = useState("")
  const [paymentPeriod, setPaymentPeriod] = useState("")
  const [date, setDate] = useState(new Date())
  const [account, setAccount] = useState("")
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [numberOfKm, setNumberOfKm] = useState(0)
  const [mwst, setMwst] = useState("")
  const [subtotal, setSubtotal] = useState(0)
  const [progress, setProgress] = useState(33)

  //conditional rendering
  const [formStatus, setFormStatus] = useState(true)
  const [productAdd, setProductAdd] = useState(false)
  const [type, setType] = useState("receipt")

  //actions

  const handleClick = () => {
    const expense = { firstname, secondname, paymentPeriod, date, account, amount, mwst, image, description, numberOfKm }
    addExpense(expense);
    setPaymentPeriod("")
    setAccount("")
    setAmount("")
    setDescription("")
    setImage()
    setNumberOfKm(0)
    setDate(new Date())
}

useEffect(() => {
  updateTotal(expenses)
}, [expenses]);

function handleTypeChange(event, newValue) {
    setType(newValue);
    setDescription("")
    setNumberOfKm(0)
  }

  const handleImageUpload = (e) => {
    let selectedFile = e.target.files[0]
    setImage(URL.createObjectURL(selectedFile))
  }


 //jsPDF
  var doc = new jsPDF({
    orientation: "l",
    fontSize: 9
  });
function createPDF(test){

    function convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join(".");
    }

  var name = expenses[0].firstname + " " + expenses[0].secondname + " - " + expenses[0].paymentPeriod + " " + new Date().getFullYear()
  var col = ["Amount","Date","Account","MWST","Description","Number of Km"];
  var rows = [];
  var imageArray = []
  var total = 0


  expenses.forEach(expense => {
        var temp = ["CHF " + expense.amount,convertDate(expense.date),expense.account,expense.mwst,expense.description,expense.numberOfKm];
        rows.push(temp);
        total += expense.amount + (expense.numberOfKm * 0.75)
    });
  doc.setFontSize(18)
  doc.text(name, 15, 10)
  doc.text("Total: CHF " + total.toString(), 15, 20)
  doc.autoTable(col, rows, { startY: 30 });


  for (var i = 0; i < expenses.length; i++){
    doc.addPage()
    var imageToDisplay = expenses[i].image
    imageArray.push(imageToDisplay)
    doc.text(name, 15, 8)
    doc.addImage(imageArray[i], 'JPEG', 10, 10, 180, 190, [i])
  }

  doc.save("SP-" + expenses[0].firstname + "-" + expenses[0].secondname + "-" + expenses[0].paymentPeriod + ".pdf");

}





  return (
  <React.Fragment>
    <Container fixed sx={{ mt: 5 }} className="Grid-style">
      {formStatus ?
        (<div>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <LinearProgress variant="determinate"
            value={progress} />
          </Grid>
          <Grid item xs={12}>
            <h2>🧍 Personal Details</h2>
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              id="outlined-required"
              label= "Firstname"
              className="InputField"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><PersonIcon/></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              required
              id="outlined-required"
              label="Secondname"
              className="InputField"
              value={secondname}
              onChange={(event) => setSecondname(event.target.value)}
              error={secondname === ""}
              helperText={secondname === "" ? "Secondname is missing." : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <h2>📅 Payout Period</h2>
            <HelpIcon
            color="primary"
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: 1/4 }}>
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Month"
                  className="InputField"
                  value={paymentPeriod}
                  onChange={(event) => setPaymentPeriod(event.target.value)}
                >
                  <MenuItem value={"January"}>January {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"February"}>February {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"March"}>March {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"April"}>April {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"May"}>May {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"June"}>June {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"July"}>July {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"August"}>August {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"September"}>September {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"Oktober"}>Oktober {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"November"}>November {new Date().getFullYear()}</MenuItem>
                  <MenuItem value={"December"}>December {new Date().getFullYear()}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={10}>
          </Grid>
          <Grid item xs={2}>
            <Stack direction="row" spacing={2}>
              <Button
              variant="contained"
              size="large"
              onClick={() => {setFormStatus(false); setProgress(66);}}
              >Next
              </Button>
            </Stack>
          </Grid>
        </Grid>
          </div>)
          :
          (
          <div>
          <Grid container spacing={5}>
          <Grid item xs={12}>
            <LinearProgress variant="determinate"
            value={progress} />
          </Grid>
          <Grid item xs={12} align="center">
            <Tabs value={type} onChange={handleTypeChange}>
              <Tab value={"receipt"} icon={<ReceiptLongIcon />} aria-label="Receipt Expense" />
              <Tab value={"car"} icon={<DirectionsCarFilledIcon />} aria-label="Car Expense" />
            </Tabs>
          </Grid>

          <Grid item xs={12}>
          {type ? (<div>
          <Grid container spacing={5}>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                inputFormat="dd.MM.yyyy"
                maxDate= {new Date()}
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>



          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Account</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Account"
                name="account"
                className="InputField"
                value={account}
                onChange={(event) => setAccount(event.target.value)}
              >
                <MenuItem value={"5820 Reisespesen"}>5820 Reisespesen</MenuItem>
                <MenuItem value={"5821 Verpflegungsspesen"}>5821 Verpflegungsspesen</MenuItem>
                <MenuItem value={"5822 Übernachtungsspesen"}>5822 Übernachtungsspesen</MenuItem>
                <MenuItem value={"5880 Personalanlässe"}>5880 Personalanlässe</MenuItem>
                <MenuItem value={"Account is unclear"}>none of these options</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <TextField
              required
              id="outlined-required"
              label="Amount"
              type="number"
              name="amount"
              className="InputField"
              InputProps={{
                startAdornment: <InputAdornment position="start">CHF</InputAdornment>,
              }}
              InputLabelProps={{
            shrink: true,
          }}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">MWST</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Account"
                name="account"
                className="InputField"
                value={mwst}
                onChange={(event) => setMwst(event.target.value)}
              >
                <MenuItem value={"2.5%"}>2.5%</MenuItem>
                <MenuItem value={"3.7%"}>3.7%</MenuItem>
                <MenuItem value={"7.7%"}>7.7%</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
          </Grid>

          <Grid item xs={8}>
            <TextField
              id="filled-multiline-static"
              label="Describe your expense"
              multiline
              rows={4}
              variant="filled"
              fullWidth
              name="description"
              className="InputField"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              />
          </Grid>
          </Grid>


          </div>) : (<div>
          <Grid container spacing={5}>
          <Grid item xs={12}>
              <TextField
              required
              id="outlined-required"
              label="Distance"
              type="number"
              name="numberOfKm"
              className="InputField"
              value={numberOfKm}
              onChange={(event) => setNumberOfKm(Number(event.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="start">Km</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-multiline-static"
              label="Describe your travel (start and end)"
              multiline
              rows={4}
              variant="filled"
              fullWidth
              name="description"
              className="InputField"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              />
          </Grid>
          </Grid>
          </div>)} </Grid>

          <Grid container spacing={5} className="spacing">
          <Grid item xs={7}>
          </Grid>
          <Grid item xs={4}>
            <h4>Subtotal: CHF {amount + numberOfKm*0.75}</h4>
          </Grid>

          <Grid item xs={1}>
            <Fab color="primary" aria-label="add" onClick={handleClick}>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        </Grid>

          </div>)}
          </Container>

          <Container fixed sx={{ mt: 5 }}>
          {formStatus ?
            (<div></div>) : (<div>
               <Grid container spacing={4}>
                 <Grid item xs={10} className="expense">
                   <h2>Expense Total: CHF {total}</h2>
                 </Grid>
                 <Grid item xs={2}>
                  <Button
                  variant="outlined"
                  size="large"
                  onClick={() =>{createPDF(); setProgress(100);}}
                  endIcon={<SendIcon />}
                  >
                    Create PDF
                  </Button>
                </Grid>
               </Grid>

                 {expenses.map((data, index) =>
                   <Grid item xs={12}>
                     <ExpenseCard key={index} id={index} {...data}/>
                   </Grid>
                 )}
             </div>)}
             </Container>

    </React.Fragment>)
}

export default Form;
