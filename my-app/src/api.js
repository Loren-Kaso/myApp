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

export async function fetchUsers(
  page = 1,
  perPage = 10,
  searchText = '',
  excludedUsernames = [],
) {
  const usersByUsername = new Map()
  const excludedUsernamesSet = new Set(excludedUsernames)
  const normalizedSearchText = searchText.trim().toLowerCase()
  let currentPage = page
  let hasMorePosts = true

  while (usersByUsername.size < perPage && hasMorePosts) {
    const params = new URLSearchParams({
      page: String(currentPage),
      per_page: String(perPage),
    })

    const postsResponse = await fetch(
      `https://dev.to/api/articles?${params.toString()}`,
    )

    if (!postsResponse.ok) {
      throw new Error('Failed to fetch users')
    }

    const posts = await postsResponse.json()
    hasMorePosts = posts.length === perPage

    posts.forEach((post) => {
      const user = post.user

      if (!user?.username) {
        return
      }

      if (excludedUsernamesSet.has(user.username)) {
        return
      }

      const email = `${user.username}@glila.com`

      if (
        normalizedSearchText &&
        !email.toLowerCase().includes(normalizedSearchText)
      ) {
        return
      }

      const existingUser = usersByUsername.get(user.username)

      if (existingUser) {
        existingUser.postsCount += 1
        return
      }

      usersByUsername.set(user.username, {
        username: user.username,
        name: user.name,
        email,
        image: user.profile_image_90,
        postsCount: 1,
      })
    })

    currentPage += 1
  }

  return {
    users: Array.from(usersByUsername.values()).slice(0, perPage),
    nextPage: currentPage,
    hasMoreUsers: hasMorePosts,
  }
}
