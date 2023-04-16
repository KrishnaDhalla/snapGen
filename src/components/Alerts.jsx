import React, { useContext } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { AppContext } from './Context';
const Alerts= () => {
  const {alert,setAlert}=useContext(AppContext)
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({open:false});
  };
  return (
    <Snackbar
    open={alert.open}
    autoHideDuration={3000}
    onClose={handleClose}
  >
     <Alert severity={alert.type} onClose={handleClose} variant="filled" elevation={10}>{alert.message}</Alert>
  </Snackbar>
  )
}

export default Alerts