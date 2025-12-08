import { useState } from 'react'
import igemLogo from './assets/logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={igemLogo} className="logo" alt="iGEM logo" />
      </div>
      <h1>Lambert iGEM</h1>
      <p className="read-the-docs">
        This website is under construction.
      </p>
    </>
  )
}

export default App
