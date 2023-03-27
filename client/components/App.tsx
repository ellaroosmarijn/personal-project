import { Routes, Route } from 'react-router-dom'

import AnswerPage from './AnswerPage'

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>App</h1>
              <p>React development has begun!</p>
            </>
          }
        />
        <Route path="/answer" element={<AnswerPage />} />
        <Route
          path="*"
          element={
            <>
              <h1>404</h1>Page not found
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
