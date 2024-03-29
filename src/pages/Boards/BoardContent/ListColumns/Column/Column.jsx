import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddCardIcon from '@mui/icons-material/AddCard'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import ListCards from './ListCards/ListCards'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'

function Column({ column, addNewCard, deleteColumnDetails }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: column._id, data: { ...column } })
  const dndKitColumnStyles = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const cards = column.cards

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')

  const handleAddNewCard = () => {
    if (!newCardTitle) {
      toast.error('Please enter card title!', { position: 'bottom-right' })
      return
    }

    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    // Call API
    addNewCard(newCardData)

    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  const confirm = useConfirm()
  // Xử lý xóa 1 column và card bên trong nó
  const handleDeleteColumn = () => {
    confirm({
      title: 'Delete Column?',
      description: 'This action will permanently delete your Column and its Cards!',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then(() => {
      deleteColumnDetails(column._id)
    }).catch(() => {})
  }

  // Phải bọc div ở đây vì vấn đề chiều cao của column khi kéo thả sẽ có bug flickering
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
        {...listeners}
      >
        {/* Box header */}
        <Box sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        >
          <Typography
            variant='h6'
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More options'>
              <ExpandMoreIcon
                sx={{ cursor: 'pointer', color: 'text.primary' }}
                id="basic-columns-dropdown"
                aria-controls={open ? 'basic-menu-columns-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-columns-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-columns-dropdown'
              }}
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-icon': { color: 'success.light' }
                  }
                }}
                onClick={toggleOpenNewCardForm}
              >
                <ListItemIcon>
                  <AddCardIcon className='add-card-icon' fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forever-icon': { color: 'warning.dark' }
                  }
                }}
                onClick={handleDeleteColumn}
              >
                <ListItemIcon>
                  <DeleteForeverIcon className='delete-forever-icon' fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Box list card */}
        <ListCards cards={cards}/>

        {/* Box footer */}
        <Box sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2
        }}>
          {!openNewCardForm ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}>Add new card</Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                gap: 1
              }}
            >
              <TextField
                id="outlined-search"
                label="Enter card title..."
                type="text"
                size='small'
                data-no-dnd='true'
                autoFocus
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  width: '170px',
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : 'white'
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Button
                variant='contained'
                size='small'
                color='success'
                data-no-dnd='true'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.success.light,
                    borderColor: (theme) => theme.palette.success.light
                  }
                }}
                onClick={handleAddNewCard}
              >
                Add
              </Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: (theme) => theme.palette.warning.light,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  toggleOpenNewCardForm()
                  setNewCardTitle('')
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column