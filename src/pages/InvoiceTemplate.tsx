// import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";

const invoiceData = {
  customer: {
    name: "John Doe",
    address: "123 Main Street, Cityville, State, 12345",
  },
  invoiceNumber: "INV-12345",
  invoiceDate: "April 17, 2022",
  items: [
    { description: "Pro Package", quantity: 1, unitPrice: 199.0 },
    { description: "Consulting", quantity: 1, unitPrice: 100.0 },
    { description: "Support", quantity: 1, unitPrice: 10.0 },
  ],
};

const InvoiceTemplate = () => {
  const getTotalAmount = () => {
    return invoiceData.items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Invoice
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6">From:</Typography>
              <Typography variant="body1">Your Company Name</Typography>
              <Typography variant="body1">123 Business Street, City, Country</Typography>
              <Typography variant="body1">Email: your@email.com</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">To:</Typography>
              <Typography variant="body1">{invoiceData.customer.name}</Typography>
              <Typography variant="body1">{invoiceData.customer.address}</Typography>
            </Grid>
          </Grid>

          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="h6" gutterBottom>
            Invoice Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body1">Invoice Number: {invoiceData.invoiceNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                Invoice Date: {invoiceData.invoiceDate}
              </Typography>
            </Grid>
          </Grid>

          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="h6" gutterBottom>
            Items
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell align="right">${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="h6" align="right">
            Total: ${getTotalAmount().toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default InvoiceTemplate;
