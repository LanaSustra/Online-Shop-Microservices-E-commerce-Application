import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <Outlet />
    </>
  )
}

export default App
