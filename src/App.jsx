import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from '~/routes'

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
                element={<Page />}
              />
            )
          })
        }
      </Routes>
    </Router>
  )
}

export default App
