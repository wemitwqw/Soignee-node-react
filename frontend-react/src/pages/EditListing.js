import React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Navigate } from 'react-router';
import EditListingForm from '../components/EditListingForm';

const theme = createTheme();

function EditListing({loginok}) {

  if (!loginok) {
    return (
      <Navigate to="/login" />
      // navigate("/login", { replace: true })
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <EditListingForm/>
      </Container>
    </ThemeProvider>
  );
}


export default EditListing;