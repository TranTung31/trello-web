import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import { Tooltip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { capitalizeFirstLetter } from '~/utils/formatters'

function BoardBar({ board }) {
  const MENU_STYLES = {
    color: 'white',
    bgcolor: 'transparent',
    paddingX: '5px',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
    '&:hover': {
      bgcolor: 'primary.50'
    }
  }

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      backgroundColor: 'white',
      paddingX: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflow: 'auto',
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
            sx={MENU_STYLES}
          />
        </Tooltip>
        <Chip
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          sx={MENU_STYLES}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{ 
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title='trantungdev'>
            <Avatar
              alt="trantungdev"
              src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
            />
          </Tooltip>
          <Tooltip title='trantungdev'>
            <Avatar
              alt="trantungdev"
              src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
            />
          </Tooltip>
          <Tooltip title='trantungdev'>
            <Avatar
              alt="trantungdev"
              src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
            />
          </Tooltip>
          <Tooltip title='trantungdev'>
            <Avatar
              alt="trantungdev"
              src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
            />
          </Tooltip>
          <Tooltip title='trantungdev'>
            <Avatar
              alt="trantungdev"
              src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
            />
          </Tooltip>
          <Tooltip title='trantungdev'>
            <Avatar
              alt="trantungdev"
              src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
            />
          </Tooltip>
          <Tooltip title='trantungdev'>
            <Avatar
              alt="trantungdev"
              src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
            />
          </Tooltip>
          <Tooltip title='trantungdev'>
            <Avatar
              alt="trantungdev"
              src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
