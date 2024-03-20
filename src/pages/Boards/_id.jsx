import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { fetchBoardDetailAPI, fetchAddColumnAPI, fetchAddCardAPI, updateBoardDetailAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65f5ac5e67281a9297c137b6'

    fetchBoardDetailAPI(boardId).then(board => {
      // Tạo Card giữ chỗ khi mảng cards rỗng => tránh việc khi kéo card vô column rỗng gây crash trang
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards.push(generatePlaceholderCard(column))
          column.cardOrderIds.push(generatePlaceholderCard(column)._id)
        }
      })

      setBoard(board)
    })
  }, [])

  const addNewColumn = async (data) => {
    const newColumn = {
      ...data,
      boardId: board._id
    }
    const createdColumn = await fetchAddColumnAPI(newColumn)

    // Tạo Card giữ chỗ khi mảng cards rỗng => tránh việc khi kéo card vô column rỗng gây crash trang
    if (isEmpty(createdColumn.cards)) {
      createdColumn.cards.push(generatePlaceholderCard(createdColumn))
      createdColumn.cardOrderIds.push(generatePlaceholderCard(createdColumn)._id)
    }

    /*
      - Cập nhật state board
      - Phía FE tự làm lại state board thay vì gọi lại API fetchBoardDetailAPI
      - Cách làm này phụ thuộc vào tùy lựa chọn và đặc thù của dự án, có nơi BE sẽ trả về luôn toàn bộ Board dù đây là API tạo Column hay Card đi chăng nữa => FE sẽ nhàn hơn
    */
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const addNewCard = async (data) => {
    const newCard = {
      ...data,
      boardId: board._id
    }
    const createdCard = await fetchAddCardAPI(newCard)

    const newBoard = { ...board }
    const columnFind = newBoard.columns.find((column) => column._id === createdCard.columnId)
    columnFind.cards.push(createdCard)
    columnFind.cardOrderIds.push(createdCard._id)
    setBoard(newBoard)
  }

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    const res = await updateBoardDetailAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
    console.log('res: ', res)
  }

  return (
    // 100vh là chiều cao tự thay đổi theo độ dài của trình duyệt
    // disableGutters maxWidth={false} giúp chiều rộng của Container chiếm full màn hình
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent
        board={board}
        addNewColumn={addNewColumn}
        addNewCard={addNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}

export default Board
