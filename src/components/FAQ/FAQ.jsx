import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import "./FAQ.css"

export default function Faq() {
  return (
    <Container fixed sx={{ mt: 5 }}>
    <Grid container spacing={5}>
      <Grid item xs={12}>
      <Typography>
        <h1>FAQ</h1>
      </Typography>
    </Grid>

    <Grid item xs={12}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>To whom do I have to send the PDF to?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Please send the PDF file directly to Robin Röösli (robin@tie-international.com or via Slack).
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>What exactly do the accounts include?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            5820 Reisespesen: Reise zu Kunden, externe Events, externer Einsatz
            5821 Verpflegungsspesen: Externe Verpflegung (bei Kunden, Reisen etc.)
            5822 Übernachtungsspesen: Übernachtungen im Hotel, Airbnb etc.
            5880 Personalanlässe: Bei internen Events (dazu zählt auch Anreise)
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Grid>

    <Grid item xs={12}>
      <Button
        variant="contained"
        href="/"
        >Back to the App
      </Button>
      </Grid>

    </Grid>
    </Container>
  );
}
