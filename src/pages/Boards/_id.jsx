import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65f54fea1704597778997cc1'

    fetchBoardDetailAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  return (
    // 100vh là chiều cao tự thay đổi theo độ dài của trình duyệt
    // disableGutters maxWidth={true} giúp chiều rộng của Container chiếm full màn hình
    <Container disableGutters maxWidth={true} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent board={board}/>
    </Container>
  )
}

export default Board
