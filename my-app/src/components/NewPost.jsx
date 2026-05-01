import { useState } from 'react'
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

const NewPost = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

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
          maxWidth: 640,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: '1px solid #d9dce3',
          boxShadow: '0 12px 30px rgba(30, 41, 59, 0.12)',
          backgroundColor: '#ffffff',
        }}
      >
        <Stack spacing={2.5}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: '#1f2937', fontWeight: 800, textAlign: 'center' }}
          >
            Create New Post
          </Typography>

          <TextField
            label="Title"
            name="title"
            placeholder="Enter post title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
          />

          <TextField
            label="Body"
            name="body"
            placeholder="Write your post content here..."
            value={body}
            onChange={(event) => setBody(event.target.value)}
            multiline
            rows={8}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              py: 1.4,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 800,
              backgroundColor: '#6366f1',
            }}
          >
            Publish
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default NewPost
