import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

const SignupPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          border: '1px solid #d9dce3',
          boxShadow: '0 12px 30px rgba(30, 41, 59, 0.12)',
          backgroundColor: '#ffffff',
        }}
      >
        <Stack spacing={2.25}>
          <Box sx={{ textAlign: 'center', mb: 1 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: '#1f2937', fontWeight: 800, mb: 0.75 }}
            >
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Sign up for a new account
            </Typography>
          </Box>

          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />

          <TextField
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            placeholder="********"
            autoComplete="new-password"
            value={repeatPassword}
            onChange={(event) => setRepeatPassword(event.target.value)}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 1,
              py: 1.4,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 800,
              backgroundColor: '#6366f1',
            }}
          >
            Sign Up
          </Button>

          <Box sx={{ textAlign: 'center', pt: 1 }}>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 0.75 }}>
              Already have an account?
            </Typography>
            <Link
              component={RouterLink}
              to="/login"
              underline="none"
              sx={{ color: '#6366f1', fontWeight: 700 }}
            >
              Login
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default SignupPage
