// import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import {
  Experimental_CssVarsProvider as CssVarsProvider
} from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from '~/App.jsx'
import theme from '~/theme'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={{
          allowClose: false,
          confirmationButtonProps: { color: 'error', variant: 'outlined' },
          cancellationButtonProps: { color: 'inherit' }
        }}
      >
        <CssBaseline />
        <App />
        <ToastContainer position="bottom-left" theme="colored"/>
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>
  // </React.StrictMode>
)
