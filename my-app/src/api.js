export async function fetchPosts(page = 1, perPage = 10, username = '') {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  })

  if (username) {
    params.set('username', username)
  }

  const postsResponse = await fetch(
    `https://dev.to/api/articles?${params.toString()}`,
  )

  if (!postsResponse.ok) {
    throw new Error('Failed to fetch posts')
  }

  return postsResponse.json()
}
