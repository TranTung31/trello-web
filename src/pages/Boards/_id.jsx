import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailAPI, fetchAddColumnAPI, fetchAddCardAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65f5ac5e67281a9297c137b6'

    fetchBoardDetailAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  const addNewColumn = async (data) => {
    const newColumn = {
      ...data,
      boardId: board._id
    }
    const result = await fetchAddColumnAPI(newColumn)
  }

  const addNewCard = async (data) => {
    const newCard = {
      ...data,
      boardId: board._id
    }
    const result = await fetchAddCardAPI(newCard)
  }

  return (
    // 100vh là chiều cao tự thay đổi theo độ dài của trình duyệt
    // disableGutters maxWidth={false} giúp chiều rộng của Container chiếm full màn hình
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent board={board} addNewColumn={addNewColumn} addNewCard={addNewCard}/>
    </Container>
  )
}

export default Board
