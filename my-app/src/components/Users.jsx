import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../api'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [searchText, setSearchText] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [nextPage, setNextPage] = useState(1)
  const [hasMoreUsers, setHasMoreUsers] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setActiveSearch(searchText)
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [searchText])

  useEffect(() => {
    async function loadUsers() {
      setIsLoading(true)
      setError('')

      try {
        const usersData = await fetchUsers(1, 10, activeSearch)
        setUsers(usersData.users)
        setNextPage(usersData.nextPage)
        setHasMoreUsers(usersData.hasMoreUsers)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [activeSearch])

  async function handleLoadMore() {
    setIsLoadingMore(true)
    setError('')

    try {
      const existingUsernames = users.map((user) => user.username)
      const usersData = await fetchUsers(
        nextPage,
        10,
        activeSearch,
        existingUsernames,
      )

      setUsers((currentUsers) => [...currentUsers, ...usersData.users])
      setNextPage(usersData.nextPage)
      setHasMoreUsers(usersData.hasMoreUsers)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoadingMore(false)
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <TextField
          id="filled-basic"
          label="Search by email..."
          variant="standard"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    component="svg"
                    viewBox="0 0 24 24"
                    sx={{
                      width: 24,
                      height: 24,
                      color: 'action.active',
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M9.5 3a6.5 6.5 0 0 1 5.18 10.43l5.45 5.44-1.41 1.42-5.45-5.45A6.5 6.5 0 1 1 9.5 3m0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9"
                    />
                  </Box>
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: 'min(100%, 520px)' }}
        />
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!isLoading && users.length > 0 && (
        <>
          <TableContainer
            component={Paper}
            sx={{
              border: '1px solid #d9dce3',
              boxShadow: '0 3px 10px rgba(30, 41, 59, 0.10)',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Posts
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="center">{user.postsCount}</TableCell>
                    <TableCell align="center">
                      <Button
                        component={Link}
                        to={`/user-posts/${user.username}`}
                        variant="contained"
                        size="small"
                        sx={{
                          borderRadius: 999,
                          textTransform: 'none',
                          backgroundColor: '#6366f1',
                        }}
                      >
                        See Posts
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {hasMoreUsers && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                sx={{
                  borderRadius: 999,
                  px: 4,
                  textTransform: 'none',
                  backgroundColor: '#6366f1',
                }}
              >
                {isLoadingMore ? (
                  <CircularProgress color="inherit" size={22} />
                ) : (
                  'Load More'
                )}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default UsersPage
