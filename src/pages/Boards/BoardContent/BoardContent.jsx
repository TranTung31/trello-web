import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : 'primary.main',
      p: '10px 0'
    }}>
      <ListColumns />
    </Box>
  )
}

export default BoardContent