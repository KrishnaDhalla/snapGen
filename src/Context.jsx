import React, { createContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import { Snackbar, Alert } from '@mui/material';

const AppContext = createContext();
const Context = ({ children }) => {
  const [user] = useAuthState(auth);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  const showSnackbar = (message, type = 'success') => {
    setAlert({
      open: true,
      message,
      type,
    });
  };

  const hideSnackbar = () => {
    setAlert({
      open: false,
      message: '',
      type: 'success',
    });
  };

  return (
    <AppContext.Provider
      value={{
        alert,
        showSnackbar,
        hideSnackbar,
        user,
      }}
    >
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={hideSnackbar}
      >
        <Alert severity={alert.type}>{alert.message}</Alert>
      </Snackbar>
    </AppContext.Provider>
  );
};

export { Context, AppContext };
