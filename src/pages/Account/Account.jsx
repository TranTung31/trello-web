import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person'
import BuildIcon from '@mui/icons-material/Build'
import TextField from '@mui/material/TextField'
import EmailIcon from '@mui/icons-material/Email'
import InputAdornment from '@mui/material/InputAdornment'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Button } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useSelector } from 'react-redux'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function Account() {
  const [value, setValue] = React.useState(0)
  const user = useSelector((state) => state.auth)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<PersonIcon />} iconPosition='start' label="ACCOUNT" {...a11yProps(0)} />
          <Tab icon={<BuildIcon />} iconPosition='start' label="SERCURITY" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '400px', height: 'fit-content' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                <Avatar
                  alt="Avatar User"
                  src=""
                  sx={{ width: 90, height: 90 }}
                />
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ fontSize: '18px', fontWeight: 500 }}>{user?.displayName}</Box>
                <Box>{user?.username}</Box>
              </Box>
            </Box>
            <TextField
              disabled
              id="filled-disabled"
              label="Your email"
              defaultValue={user?.email}
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              disabled
              id="filled-disabled"
              label="Your Username"
              defaultValue={user?.email}
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              id="filled-display-name"
              label="Your Display Name"
              defaultValue={user?.displayName}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                )
              }}
            />
            <Button variant='contained'>Update</Button>
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        SERCURITY
      </CustomTabPanel>
    </Box>
  )
}

export default Account