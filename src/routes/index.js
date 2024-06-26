import SignIn from '~/pages/Auth/SignIn/SignIn'
import SignUp from '~/pages/Auth/SignUp/SignUp'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/NotFound/NotFound'
import Account from '~/pages/Account/Account'
import Redux from '~/pages/Redux/Redux'

export const routes = [
  {
    path: '/',
    element: Board,
    isShowHeader: true
  },
  {
    path: '/register',
    element: SignUp,
    isShowHeader: false
  },
  {
    path: '/login',
    element: SignIn,
    isShowHeader: false
  },
  {
    path: '/settings',
    element: Account,
    isShowHeader: true
  },
  {
    path: '/redux',
    element: Redux,
    isShowHeader: false
  },
  {
    path: '*',
    element: NotFound,
    isShowHeader: false
  }
]