import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns({ columns }) {
  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        width: '100%',
        height: '100%',
        bgcolor: 'inherit',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
    >
      {columns?.map(column => <Column key={column._id} column={column}/>)}

      {/* Button add new column */}
      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          height: 'fit-content',
          mx: 2,
          borderRadius: '6px',
          bgcolor: '#ffffff3d',
        }}
      >
        <Button
          startIcon={<NoteAddIcon />}
          sx={{
            width: '100%',
            pl: 2.5,
            py: 1,
            justifyContent: 'flex-start',
            color: 'white'
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns