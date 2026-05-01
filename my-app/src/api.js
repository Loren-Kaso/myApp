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

export async function fetchUsers(page = 1, perPage = 10, searchText = '') {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  })

  const postsResponse = await fetch(
    `https://dev.to/api/articles?${params.toString()}`,
  )

  if (!postsResponse.ok) {
    throw new Error('Failed to fetch users')
  }

  const posts = await postsResponse.json()
  const usersByUsername = new Map()

  posts.forEach((post) => {
    const user = post.user

    if (!user?.username) {
      return
    }

    const email = `${user.username}@glila.com`
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

  const normalizedSearchText = searchText.trim().toLowerCase()
  const users = Array.from(usersByUsername.values())

  if (!normalizedSearchText) {
    return users
  }

  return users.filter((user) =>
    user.email.toLowerCase().includes(normalizedSearchText),
  )
}
