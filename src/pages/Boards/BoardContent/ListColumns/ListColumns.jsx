import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import CloseIcon from '@mui/icons-material/Close'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Column from './Column/Column'
import { toast } from 'react-toastify'

function ListColumns({ columns, addNewColumn, addNewCard }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const handleAddNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter column title!')
      return
    }

    const newColumnData = {
      title: newColumnTitle
    }

    /*
      - Gọi lên props function addNewColumn nằm ở component cha cao nhất
      - Có thể đưa dữ liệu Board ra Redux Global Store lúc ý có thể gọi luôn API ở đây thay vì phải
      gọi ngược lên component cha ở phía trên
    */
    await addNewColumn(newColumnData)

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    <SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
        {columns?.map(column => <Column key={column._id} column={column} addNewCard={addNewCard}/>)}

        {!openNewColumnForm ? (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              height: 'fit-content',
              mx: 2,
              borderRadius: '6px',
              bgcolor: '#ffffff3d'
            }}
            onClick={toggleOpenNewColumnForm}
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
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              height: 'fit-content',
              mx: 2,
              padding: '10px 8px',
              borderRadius: '6px',
              bgcolor: '#ffffff3d'
            }}
          >
            <TextField
              id="outlined-search"
              label="Enter column title..."
              type="text"
              size='small'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                width: '100%',
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 1
              }}
            >
              <Button
                variant='contained'
                size='small'
                color='success'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.success.light,
                    borderColor: (theme) => theme.palette.success.light
                  }
                }}
                onClick={handleAddNewColumn}
              >
                Add Column
              </Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={() => {
                  toggleOpenNewColumnForm()
                  setNewColumnTitle('')
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns