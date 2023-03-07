import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Details } from './components/Details'
import { Homepage } from './components/Homepage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "" element={<Homepage/>} ></Route>
          <Route path = "/:type/:id" element={<Details />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App