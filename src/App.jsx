import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from '~/routes'
import DefaultLayout from '~/components/DefaultLayout/DefaultLayout'

function App() {
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
