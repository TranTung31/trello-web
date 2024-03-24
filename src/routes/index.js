import SignIn from '~/pages/Auth/SignIn/SignIn'
import SignUp from '~/pages/Auth/SignUp/SignUp'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/NotFound/NotFound'

export const routes = [
  {
    path: '/',
    element: Board
  },
  {
    path: '/register',
    element: SignUp
  },
  {
    path: '/login',
    element: SignIn
  },
  {
    path: '*',
    element: NotFound
  }
]