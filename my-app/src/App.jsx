import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import TopBar from './components/TopBar'
import Feed from './components/Feed'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import UserPage from './components/UserPage'
import './App.css'
import HomePage from './components/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TopBar />

      <section className="posts-section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          
        </Routes>
      </section>

    </>
  )
}

export default App
