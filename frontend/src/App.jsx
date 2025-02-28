import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
