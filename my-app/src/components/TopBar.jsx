import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

function TopBar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #5f5cf6, #8b4cf6)',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          MyApp
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/users" style={{ color: 'white', textDecoration: 'none' }}>
            Users
          </Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
            About
          </Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
            Login
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
