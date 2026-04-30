import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import SinglePost from './SinglePost'
import { fetchPosts } from '../api'

const POSTS_PER_PAGE = 10

function Feed({ username = '' }) {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true)
      setError('')

      try {
        const postsData = await fetchPosts(1, POSTS_PER_PAGE, username)
        setPosts(postsData)
        setPage(1)
        setHasMorePosts(postsData.length === POSTS_PER_PAGE)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [username])

  async function handleLoadMore() {
    const nextPage = page + 1

    setIsLoadingMore(true)
    setError('')

    try {
      const nextPosts = await fetchPosts(nextPage, POSTS_PER_PAGE, username)

      setPosts((currentPosts) => [...currentPosts, ...nextPosts])
      setPage(nextPage)
      setHasMorePosts(nextPosts.length === POSTS_PER_PAGE)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoadingMore(false)
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error && posts.length === 0) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Grid container spacing={2}>
      {error && (
        <Grid size={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}

      {posts.map((post) => (
        <Grid key={post.id} size={{ xs: 12, md: 6 }}>
          <SinglePost
            title={post.title}
            authorName={post.user?.name}
            authorUsername={post.user?.username}
            authorImage={post.user?.profile_image_90}
            body={post.description}
            coverImage={post.cover_image}
            publishedAt={post.readable_publish_date}
            tags={post.tag_list}
            url={post.url}
          />
        </Grid>
      ))}

      {hasMorePosts && (
        <Grid size={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              sx={{ borderRadius: 999, textTransform: 'none' }}
            >
              {isLoadingMore ? (
                <CircularProgress color="inherit" size={22} />
              ) : (
                'Load more'
              )}
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default Feed
