import AppBar from '~/components/AppBar/AppBar'
import Container from '@mui/material/Container'

function DefaultLayout({ children, isShowHeader }) {
  return (
    // 100vh là chiều cao tự thay đổi theo độ dài của trình duyệt
    // disableGutters maxWidth={false} giúp chiều rộng của Container chiếm full màn hình
    <Container disableGutters maxWidth={false} sx={{ height: '100%', minHeight: '100vh' }}>
      {isShowHeader && <AppBar />}
      {children}
    </Container>
  )
}

export default DefaultLayout