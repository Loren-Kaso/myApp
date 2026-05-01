import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link, NavLink } from 'react-router-dom'

const navLinkStyle = ({ isActive }) => ({
  color: 'white',
  textDecoration: 'none',
  padding: '6px 12px',
  borderRadius: '8px',
  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
})

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            MyApp
          </Typography>

          <Button
            component={Link}
            to="/new-post"
            variant="contained"
            size="small"
            sx={{
              borderRadius: 999,
              color: '#111827',
              backgroundColor: '#facc15',
              fontWeight: 800,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#eab308',
              },
            }}
          >
            + New Post
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <NavLink to="/" style={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/users" style={navLinkStyle}>
            Users
          </NavLink>
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>
          <NavLink to="/login" style={navLinkStyle}>
            Login
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
