import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from '~/routes'
import DefaultLayout from '~/components/DefaultLayout/DefaultLayout'
import { axiosJWT, refreshTokenAPI } from '~/apis/index'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { signin } from '~/redux/slices/authSlice'

function App() {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  axiosJWT.interceptors.request.use(
    async (config) => {
      if (auth.accessToken) {
        const accessTokenDecoded = jwtDecode(auth.accessToken)
        const date = new Date()
        if (accessTokenDecoded.exp < date.getTime() / 1000) {
          const res = await refreshTokenAPI(auth?.refreshToken)
          const newAuth = {
            ...auth,
            accessToken: res?.accessToken,
            refreshToken: res?.refreshToken
          }
          dispatch(signin(newAuth))
          config.headers['token'] = `Bearer ${res?.accessToken}`
        }
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  return (
    <Router>
      <Routes>
        {
          routes.map((route, index) => {
            const Page = route.element
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout isShowHeader={route.isShowHeader}>
                    <Page />
                  </DefaultLayout>
                }
              />
            )
          })
        }
      </Routes>
    </Router>
  )
}

export default App
