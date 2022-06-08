import React, { useContext, useState, useEffect } from "react";

//Local files
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import "./Form.css";
import carImage from "../../assets/car.jpg";

//Context
import useTool from "../../context/ExpensesContext";

//MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import HelpIcon from "@mui/icons-material/Help";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";

//Icons
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

//jsPDF
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Form = () => {
  //useReducer
  const { expenses, addExpense, removeExpense, updateTotal, total } = useTool();

  //Data labels
  const [uniqueId, setUniqueId] = useState(1);
  const [firstname, setFirstname] = useState("");
  const [secondname, setSecondname] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState("");
  const [date, setDate] = useState(new Date());
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [numberOfKm, setNumberOfKm] = useState(0);
  const [mwst, setMwst] = useState("");
  const [progress, setProgress] = useState(33);
  const [receiptSwitch, setReceiptSwitch] = useState(false);
  const [carSwitch, setCarSwitch] = useState(false);
  const [dateFactor, setDateFactor] = useState(new Date().getDay());
  const currentYear = new Date().getFullYear();
  const paymentPeriodArray = [];
  const referenceUploadedImage = React.useRef();
  const mileageCompensation = 0.75;

  //Validation
  const [personalDetailsError, setPersonalDetailsError] = useState(false);
  const [receiptError, setReceiptError] = useState(false);
  const [carError, setCarError] = useState(false);

  const [firstnameError, setFirstnameError] = useState(null);
  const [secondnameError, setSecondnameError] = useState(null);
  const [paymentPeriodError, setPaymentPeriodError] = useState(null);

  const [dateError, setDateError] = useState(null);
  const [accountError, setAccountError] = useState(null);
  const [amountError, setAmountError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [mwstError, setMwstError] = useState(null);
  const [numberOfKmError, setNumberOfKmError] = useState(null);

  //Conditional rendering
  const [formStatus, setFormStatus] = useState(true);
  const [productAdd, setProductAdd] = useState(false);
  const [createPdfButton, setCreatePdfButton] = useState(false);

  //Dialog
  const [openReceipt, setOpenReceipt] = useState(false);
  const [openCar, setOpenCar] = useState(false);

  //Calculate total
  useEffect(() => {
    updateTotal(expenses);
    checkPdfButton();
  }, [expenses]);

  //Create payment periods list
  for (let i = 0; i < 3; i++) {
    let month = new Date().getMonth() + dateFactor + i;
    let year = new Date().getFullYear();
    if (month > 12) {
      month = month - 12;
      year = year + 1;
    }
    const nameMonth = {
      1: "Januar",
      2: "Februar",
      3: "März",
      4: "April",
      5: "Mai",
      6: "Juni",
      7: "Juli",
      8: "August",
      9: "September",
      10: "Oktober",
      11: "November",
      12: "Dezember",
    };
    paymentPeriodArray.push(nameMonth[month] + " " + year);
  }

  useEffect(() => {
    if (new Date().getDate() <= 25) {
      setDateFactor(1);
    } else {
      setDateFactor(2);
    }
    console.log(dateFactor);
  }, []);

  //Set payment period
  useEffect(() => {
    setPaymentPeriod(paymentPeriodArray[0]);
  }, [paymentPeriodArray]);

  //Create image URL
  const handleImageUpload = (e) => {
    let selectedFile = e.target.files[0];
    setImage(URL.createObjectURL(selectedFile));
  };

  //Reset values
  const resetValues = () => {
    setAccount("");
    setAmount(0);
    setDescription("");
    setImage("");
    setNumberOfKm(0);
    setDate(new Date());
    setMwst("");
    setUniqueId(uniqueId + 1);
  };

  //set "Create PDF" button
  const checkPdfButton = () => {
    if (expenses.length >= 1) {
      setCreatePdfButton(true);
    } else {
      setCreatePdfButton(false);
    }
  };

  //Validation
  //Reset validation
  const resetValidation = () => {
    setDateError(false);
    setAccountError(null);
    setAmountError(null);
    setDescriptionError(null);
    setImageError(null);
    setMwstError(null);
    setNumberOfKmError(null);
  };

  //Personal details validation
  function handlePersonalDetailsError() {
    firstname.length < 2 || firstname.length > 20
      ? setFirstnameError(true)
      : setFirstnameError(false);
    secondname.length < 2 || secondname.length > 20
      ? setSecondnameError(true)
      : setSecondnameError(false);
    paymentPeriod === ""
      ? setPaymentPeriodError(true)
      : setPaymentPeriodError(false);
  }

  useEffect(() => {
    if (
      firstnameError === false &&
      secondnameError === false &&
      paymentPeriodError === false
    ) {
      setFormStatus(false);
      setProgress(66);
    } else {
    }
  }, [firstnameError, secondnameError, paymentPeriodError]);

  //Receipt validation
  function handleReceiptValidation() {
    date == "test" ? setDateError(true) : setDateError(false);
    account === "" ? setAccountError(true) : setAccountError(false);
    amount == 0 || amount > 3000 ? setAmountError(true) : setAmountError(false);
    mwst === "" ? setMwstError(true) : setMwstError(false);
    image === "" ? setImageError(true) : setImageError(false);
    description.length < 10 || description.length > 300
      ? setDescriptionError(true)
      : setDescriptionError(false);
  }

  //Car travel validation
  function handleCarValidation() {
    date === "test" ? setDateError(true) : setDateError(false);
    numberOfKm == 0 ? setNumberOfKmError(true) : setNumberOfKmError(false);
    description.length < 10 || description.length > 300
      ? setDescriptionError(true)
      : setDescriptionError(false);
  }

  //Dialog
  //Receipt
    //Open
    const handleClickOpenReceipt = () => {
      setOpenReceipt(true);
    };

    //Cancel
    const handleCloseReceipt = () => {
      setOpenReceipt(false);
      resetValues();
      resetValidation();
    };

    //Add
    useEffect(() => {
      if (
        dateError === false &&
        accountError === false &&
        amountError === false &&
        mwstError === false &&
        imageError === false &&
        descriptionError === false
      ) {
        setOpenReceipt(false);
        const expense = {
          uniqueId,
          firstname,
          secondname,
          paymentPeriod,
          date,
          account,
          amount,
          mwst,
          image,
          description,
          numberOfKm,
        };
        addExpense(expense);
        resetValues();
        resetValidation();
      } else {
      }
    }, [receiptSwitch]);

  //Car travel
    //Open
    const handleClickOpenCar = () => {
      setOpenCar(true);
      setImage(process.env.PUBLIC_URL + "carIcon.jpg");
      setAccount("5820 Reisespesen");
      setMwst("0%");
    };

    //Cancel
    const handleCloseCar = () => {
      setOpenCar(false);
      resetValues();
      resetValidation();
    };

    //Add
    useEffect(() => {
      if (
        dateError === false &&
        numberOfKmError === false &&
        descriptionError === false
      ) {
        setOpenCar(false);
        const expense = {
          uniqueId,
          firstname,
          secondname,
          paymentPeriod,
          date,
          account,
          amount,
          mwst,
          image,
          description,
          numberOfKm,
        };
        addExpense(expense);
        resetValues();
        resetValidation();
      } else {
      }
    }, [carSwitch]);

  //jsPDF
  //Doc specifications
  var doc = new jsPDF({
    orientation: "l",
    fontSize: 9,
  });

  //Doc creation
  function createPDF(test) {
    function convertDate(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join(".");
    }

    var col = [
      "Date",
      "Account",
      "Description",
      "MWST",
      "Number of Km",
      "Amount",
    ];
    var rows = [];
    var imageArray = [];
    var total = 0;

    expenses.forEach((expense) => {
      var temp = [
        convertDate(expense.date),
        expense.account,
        expense.description,
        expense.mwst,
        expense.numberOfKm,
        "CHF " + expense.amount,
      ];
      rows.push(temp);
      total += expense.amount;
    });
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(
      expenses[0].firstname +
        " " +
        expenses[0].secondname +
        "  -  " +
        expenses[0].paymentPeriod,
      15,
      45
    );
    doc.text("Total: CHF " + total.toString(), 235, 45);
    doc.addImage(
      process.env.PUBLIC_URL + "TIE-logo.png",
      "PNG",
      15,
      10,
      24,
      21,
      [i]
    );
    doc.autoTable(col, rows, { startY: 55 });

    //loop through expenses
    for (var i = 0; i < expenses.length; i++) {
      doc.addPage();
      var imageToDisplay = expenses[i].image;
      imageArray.push(imageToDisplay);

      doc.addImage(
        process.env.PUBLIC_URL + "TIE-logo.png",
        "PNG",
        15,
        10,
        24,
        21,
        [i + "logo"]
      );
      doc.text(expenses[i].firstname + " " + expenses[i].secondname, 15, 50);
      doc.text(expenses[i].paymentPeriod, 15, 57);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.text("CHF " + expenses[i].amount, 15, 75);
      doc.text(expenses[i].account, 15, 82);
      doc.text(expenses[i].mwst + " MWST", 15, 89);
      doc.text(expenses[i].numberOfKm + " KM", 15, 96);

      doc.setFont("helvetica", "italic");
      var adjustedText = doc.splitTextToSize(expenses[i].description, 85);
      doc.text(adjustedText, 15, 110);
      doc.addImage(imageArray[i], "JPEG", 105, 10, 180, 190, [i]);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
    }

    //Doc save process
    doc.save(
      "SP-" +
        expenses[0].firstname +
        "-" +
        expenses[0].secondname +
        "-" +
        expenses[0].paymentPeriod +
        ".pdf"
    );
  }

  return (
    <React.Fragment>
      <Container fixed sx={{ mt: 5 }}>
        {/*Formstatus distinguishs between personal details and expense management*/}
        {formStatus ? (
          <div>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <LinearProgress variant="determinate" value={progress} />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-required"
                  label="Firstname"
                  className="InputField"
                  value={firstname}
                  onChange={(event) => setFirstname(event.target.value)}
                  error={firstnameError}
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="outlined-required"
                  label="Secondname"
                  className="InputField"
                  value={secondname}
                  onChange={(event) => setSecondname(event.target.value)}
                  error={secondnameError}
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ width: 1 / 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Month"
                      className="InputField"
                      value={paymentPeriod}
                      onChange={(event) => setPaymentPeriod(event.target.value)}
                      error={paymentPeriodError}
                    >
                      {paymentPeriodArray.map((i) => (
                        <MenuItem value={i}>{i}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={10}></Grid>
              <Grid item xs={2}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      handlePersonalDetailsError();
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div>
            {/*Expense management is now following (incl. dialogs)*/}
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <LinearProgress variant="determinate" value={progress} />
              </Grid>
              <Grid item xs={12}>
                <div className="ChipsRow">
                  <div className="Chips" onClick={handleClickOpenReceipt}>
                    <Typography>
                      <h3>Receipt</h3>
                    </Typography>
                    <ReceiptLongIcon sx={{ fontSize: "80px" }} />
                  </div>
                  <div className="Chips" onClick={handleClickOpenCar}>
                    <Typography>
                      <h3>Car Travel</h3>
                    </Typography>
                    <DirectionsCarFilledIcon sx={{ fontSize: "80px" }} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={9.5} className="expense">
                <Typography>
                  <h3 className={"totalValue"}>
                    Expense Total: CHF {total.toFixed(2).toLocaleString()}
                  </h3>
                </Typography>
              </Grid>
              {/*Conditional rendering for "Create PDF" button*/}
              {createPdfButton ? (
                <Grid item xs={2.5}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      createPDF();
                      setProgress(100);
                    }}
                    endIcon={<SendIcon />}
                  >
                    Create PDF
                  </Button>
                </Grid>
              ) : (
                <div></div>
              )}
              {/*Dialog for receipt expenses*/}
              <Dialog
                disableEscapeKeyDown
                open={openReceipt}
                onClose={handleCloseReceipt}
                maxWidth="lg"
                fullWidth={true}
              >
                <DialogTitle>Add your receipt expense</DialogTitle>
                <DialogContent>
                  <Box
                    component="form"
                    sx={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <Grid container spacing={4} className="DialogGrid">
                      <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Date"
                            inputFormat="dd.MM.yyyy"
                            maxDate={new Date()}
                            value={date}
                            onChange={(newValue) => {
                              setDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            error={dateError}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl fullWidth error={accountError}>
                          <InputLabel id="demo-simple-select-error-label">
                            Account
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-error-label"
                            id="demo-simple-select-error"
                            label="Account"
                            name="account"
                            className="InputField"
                            value={account}
                            onChange={(event) => setAccount(event.target.value)}
                            error={accountError}
                          >
                            <MenuItem value={"5820 Reisespesen"}>
                              5820 Reisespesen
                            </MenuItem>
                            <MenuItem value={"5821 Verpflegungsspesen"}>
                              5821 Verpflegungsspesen
                            </MenuItem>
                            <MenuItem value={"5822 Übernachtungsspesen"}>
                              5822 Übernachtungsspesen
                            </MenuItem>
                            <MenuItem value={"5880 Personalanlässe"}>
                              5880 Personalanlässe
                            </MenuItem>
                            <MenuItem value={"Account is unclear"}>
                              <em>None of these options</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          id="outlined-required"
                          label="Amount"
                          type="number"
                          name="amount"
                          className="InputField"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                CHF
                              </InputAdornment>
                            ),
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={amount.toString()}
                          onChange={(event) =>
                            setAmount(Number(event.target.value))
                          }
                          error={amountError}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl fullWidth error={mwstError}>
                          <InputLabel id="demo-simple-select-label">
                            MWST
                          </InputLabel>
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
                        <Typography>
                          <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            ref={referenceUploadedImage}
                            onChange={handleImageUpload}
                            color="red"
                            className={imageError ? "FileAlert" : ""}
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="filled-multiline-static"
                          label="Describe your expense"
                          multiline
                          rows={2}
                          variant="filled"
                          fullWidth
                          name="description"
                          className="InputField"
                          inputProps={{ maxLength: 300 }}
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                          error={descriptionError}
                          helperText={
                            descriptionError ? "at least 10 characters" : ""
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseReceipt}>Cancel</Button>
                  <Button
                    onClick={() => {
                      handleReceiptValidation();
                      setReceiptSwitch((current) => !current);
                    }}
                  >
                    Add
                  </Button>
                </DialogActions>
              </Dialog>

              {/*dialog for car travel expenses*/}
              <Dialog
                disableEscapeKeyDown
                open={openCar}
                onClose={handleCloseCar}
                maxWidth="lg"
                fullWidth={true}
              >
                <DialogTitle>Add your car travel</DialogTitle>
                <DialogContent>
                  <Box
                    component="form"
                    sx={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <Grid container spacing={4} className="DialogGrid">
                      <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Date"
                            inputFormat="dd.MM.yyyy"
                            maxDate={new Date()}
                            value={date}
                            onChange={(newValue) => {
                              setDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            error={dateError}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          id="outlined-required"
                          label="Number of Kilometres"
                          type="number"
                          name="amount"
                          className="InputField"
                          value={numberOfKm.toString()}
                          onChange={(event) => {
                            setNumberOfKm(Number(event.target.value));
                            setAmount(
                              Number(event.target.value) * mileageCompensation
                            );
                          }}
                          error={numberOfKmError}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="filled-multiline-static"
                          label="Describe your travel (from & to)"
                          multiline
                          rows={2}
                          variant="filled"
                          fullWidth
                          name="description"
                          className="InputField"
                          inputProps={{ maxLength: 300 }}
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                          error={descriptionError}
                          helperText={
                            descriptionError ? "at least 10 characters" : ""
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCar}>Cancel</Button>
                  <Button
                    onClick={() => {
                      handleCarValidation();
                      setCarSwitch((current) => !current);
                    }}
                  >
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>

            {/*Mapping of the expenses (receipt and car travel expenses)*/}
            {expenses.map((data, index) => (
              <Grid item xs={12}>
                <ExpenseCard key={index} id={index} {...data} />
              </Grid>
            ))}
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Form;
