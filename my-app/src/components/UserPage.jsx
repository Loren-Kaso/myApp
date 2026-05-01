import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Feed from './Feed'

const UserPage = () => {
  const { username } = useParams()

  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        sx={{ color: '#111827', fontWeight: 700, mb: 3 }}
      >
        Posts by {username}
      </Typography>

      <Feed username={username} />
    </Box>
  )
}

export default UserPage
