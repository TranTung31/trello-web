import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import HttpsIcon from '@mui/icons-material/Https'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const STYLES_ICON = {
  width: '40px',
  height: '40px',
  color: '#fff',
  bgcolor: (theme) => theme.palette.primary.main,
  borderRadius: '50%',
  lineHeight: '52px',
  textAlign: 'center'
}

const STYLES_TEXT_FIELD = {
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main }
  }
}

// eslint-disable-next-line no-useless-escape
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errorMessage, setErrorMessage] = useState({})
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { value, name } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleRegister = () => {
    let error = {}
    if (!formData.email.trim()) {
      error.email = 'This field is required!'
    }
    if (!formData.password.trim()) {
      error.password = 'This field is required!'
    }
    if (!formData.confirmPassword.trim()) {
      error.confirmPassword = 'This field is required!'
    }
    setErrorMessage(error)

    // Register
    if (Object.keys(errorMessage).length === 0 &&
      formData.email && formData.password && formData.confirmPassword) {
      toast.success('Register successfully!')
    }
  }

  useEffect(() => {
    if (formData.email && !regexEmail.test(formData.email)) {
      setErrorMessage({ ...errorMessage, email: 'Email is valid! (example@gmail.com)' })
    } else {
      delete errorMessage.email
      setErrorMessage({ ...errorMessage })
    }

    if (formData.confirmPassword) setErrorMessage({ ...errorMessage, confirmPassword: '' })
  }, [formData?.email])

  useEffect(() => {
    if (formData.password && !regexPassword.test(formData.password)) {
      setErrorMessage({ ...errorMessage, password: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!' })
    } else if (formData?.password && formData?.confirmPassword && formData?.password !== formData?.confirmPassword) {
      setErrorMessage({ ...errorMessage, confirmPassword: 'Password confirmation does not match!' })
    } else {
      delete errorMessage.password
      delete errorMessage?.confirmPassword
      setErrorMessage({ ...errorMessage })
    }
  }, [formData?.password])

  useEffect(() => {
    if (formData?.confirmPassword && formData?.password !== formData?.confirmPassword) {
      setErrorMessage({ ...errorMessage, confirmPassword: 'Password confirmation does not match!' })
    } else {
      delete errorMessage.confirmPassword
      setErrorMessage({ ...errorMessage })
    }
  }, [formData?.confirmPassword])

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center'
      }}
      bgcolor={(theme) => theme.palette.primary.light}
    >
      <Box
        sx={{
          minWidth: { xs: '280px', sm: '380px', md: '400px' },
          maxWidth: { xs: '280px', md: '400px' },
          height: 'fit-content',
          borderRadius: '6px'
        }}
        bgcolor='#fff'
        mt={{ xs: 6, md: 10 }}
        mb={{ xs: 6 }}
        p={2}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2,
            mt: 2,
            mb: 2
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={STYLES_ICON}><HttpsIcon /></Box>
            <Box sx={STYLES_ICON}><SvgIcon component={TrelloIcon} inheritViewBox/></Box>
          </Box>
          <Box sx={{ color: (theme) => theme.palette.text.secondary }}>Author: TranTungDev</Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Enter Email..."
            id="email"
            sx={STYLES_TEXT_FIELD}
            name='email'
            onChange={handleOnChange}
          />
          {errorMessage?.email && <Alert severity="error" color="error">
            {errorMessage?.email}
          </Alert>}
          <TextField
            type='password'
            fullWidth
            label="Enter Password..."
            id="password"
            sx={STYLES_TEXT_FIELD}
            name='password'
            onChange={handleOnChange}
          />
          {errorMessage?.password && <Alert severity="error" color="error">
            {errorMessage?.password}
          </Alert>}
          <TextField
            type='password'
            fullWidth
            label="Enter Password Confirm..."
            id="password-confirm"
            sx={STYLES_TEXT_FIELD}
            name='confirmPassword'
            onChange={handleOnChange}
          />
          {errorMessage?.confirmPassword && <Alert severity="error" color="error">
            {errorMessage?.confirmPassword}
          </Alert>}
          <Button variant="contained" sx={{ height: '42px' }} onClick={handleRegister}>Register</Button>
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
          mt={2}
        >
          <Box>Already have an account?</Box>
          <Box
            sx={{ color: (theme) => theme.palette.primary.main, cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Login!
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUp