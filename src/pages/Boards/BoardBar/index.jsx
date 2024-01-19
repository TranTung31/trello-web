import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      backgroundColor: 'primary.dark',
      display: 'flex',
      alignItems: 'center'
    }}>
      Board bar
    </Box>
  )
}

export default BoardBar
