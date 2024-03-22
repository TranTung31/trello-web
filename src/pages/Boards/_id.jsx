import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { generatePlaceholderCard } from '~/utils/formatters'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { fetchBoardDetailAPI,
  fetchAddColumnAPI,
  fetchAddCardAPI,
  updateBoardDetailAPI,
  updateColumnDetailAPI,
  moveCardToDifferentColumnAPI
} from '~/apis'
import { mapOrder } from '~/utils/sorts'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65f5ac5e67281a9297c137b6'

    fetchBoardDetailAPI(boardId).then(board => {
      // Sắp xếp các columns ở đây trước khi đưa dữ liệu xuống dưới các component con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      // Tạo Card giữ chỗ khi mảng cards rỗng => tránh việc khi kéo card vô column rỗng gây crash trang
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards.push(generatePlaceholderCard(column))
          column.cardOrderIds.push(generatePlaceholderCard(column)._id)
        } else {
          // Sắp xếp các cards ở đây trước khi đưa dữ liệu xuống dưới các component con
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      // console.log('board origin: ', board)
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
    // Xử lý trường hợp tạo mới card trong 1 column rỗng, khi đó sẽ có card giữ chỗ placeholder-card cần xóa đi để đảm bảo đúng logic. Ngược lại nếu tạo mới card trong 1 column đã có card thì sẽ push vào cuối mảng
    if (columnFind.cards.some(card => card.FE_PlaceholderCard)) {
      columnFind.cards = [createdCard]
      columnFind.cardOrderIds = [createdCard._id]
    } else {
      columnFind.cards.push(createdCard)
      columnFind.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    // Update cho chuẩn dữ liệu state board
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Khi nào call API mà muốn nhận response trả về thì mới async await function moveColumns (.then .catch tương tự)
    // Call API
    updateBoardDetailAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  // Khi di chuyển card trong cùng 1 column, chỉ cần gọi API cập nhật lại mảng cardOrderIds của column chứa nó (thay đổi vị trí trong mảng)
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Update cho chuẩn dữ liệu state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find((column) => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // Call API
    updateColumnDetailAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /*
    - Khi di chuyển card sang column khác:
    B1: Cập nhật lại mảng cardOrderIds của column ban đầu (Xóa _id của card được kéo ra khỏi mảng)
    B2: Cập nhật lại mảng cardOrderIds của column tiếp theo (Thêm _id của card vào mảng)
    B3: Cập nhật lại trường columnId của card đã kéo
    => Làm 1 API
  */
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    // console.log('currentCardId: ', currentCardId)
    // console.log('prevColumnId: ', prevColumnId)
    // console.log('nextColumnId: ', nextColumnId)
    // console.log('dndOrderedColumns: ', dndOrderedColumns)

    const dndOrderedColumnsIds = dndOrderedColumns.map(column => column._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    let prevCardOrderIds = dndOrderedColumns.find(column => column._id === prevColumnId).cardOrderIds
    // Xử lý bug khi kéo card sang column khác, column cũ trống chỉ có card giữ chỗ placeholder-card khi đó cần xóa card giữ chỗ có placeholder-card khỏi mảng cardOrderIds trước khi gửi dữ liệu cho back-end lưu
    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(column => column._id === nextColumnId).cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          bgcolor: '#ecf0f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}
      >
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{
            'svg circle': { stroke: 'url(#my_gradient)' }
          }}
          size={60}
        />
        <h3>Loading Board</h3>
      </Box>
    )
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
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board
