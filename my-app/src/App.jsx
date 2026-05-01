import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import TopBar from './components/TopBar'
import Feed from './components/Feed'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import UserPage from './components/UserPage'
import Login from './components/Login'
import Signup from './components/Signup'
import HomePage from './components/HomePage'
import NewPost from './components/NewPost'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TopBar />

      <section className="posts-section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user-posts/:username" element={<UserPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </section>

    </>
  )
}

export default App
