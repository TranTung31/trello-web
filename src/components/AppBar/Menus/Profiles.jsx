import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '~/redux/slices/authSlice'

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigateMyAccount = () => {
    navigate('/settings')
    handleClose()
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 34, height: 34 }} src={auth.avatar}/>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profile'
        }}
      >
        {auth._id &&
        <Box>
          <MenuItem onClick={handleNavigateMyAccount}>
            <Avatar sx={{ width: 28, height: 28, mr: 2 }}/> My account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Box>}
        {auth._id === '' &&
        <MenuItem onClick={() => navigate('/login')}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Register or Sign in
        </MenuItem>}
      </Menu>
    </Box>
  )
}

export default Profiles
