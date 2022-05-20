import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import "./FAQ.css"

export default function FAQ() {
  return (
    <Container className="faq">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>To whom Do I have to send the PDF to?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Please send the PDF file directly to Robin Röösli (robin@tie-international.com).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Does the public transport fair count for half-tax or full?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            It is always half tax. Further information can be found in the "Personalreglement".
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Button
        variant="contained"
        href="Form"
        className={"button"}
        >Back to the App
      </Button>
    </Container>
  );
}