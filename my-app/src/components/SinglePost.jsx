import { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

function SinglePost({
  title,
  authorName,
  authorUsername,
  authorImage,
  body,
  coverImage,
  publishedAt,
  tags = [],
  url,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const authorText = authorUsername ? `@${authorUsername}` : authorName

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 2,
        backgroundColor: '#ffffff',
        border: '1px solid #d9dce3',
        boxShadow: '0 3px 10px rgba(30, 41, 59, 0.10)',
      }}
    >
      <CardHeader
        avatar={<Avatar src={authorImage} alt={authorName} />}
        title={authorName}
        subheader={publishedAt}
        titleTypographyProps={{ sx: { color: '#111827', fontWeight: 700 } }}
        subheaderTypographyProps={{ sx: { color: '#6b7280' } }}
      />

      {coverImage && (
        <CardMedia
          component="img"
          height="180"
          image={coverImage}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: '#111827', fontWeight: 700 }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: '#6366f1', fontWeight: 600, mb: 2 }}
        >
          {authorText}
        </Typography>

        <Typography
          variant="body1"
          sx={
            isExpanded
              ? { color: '#111827' }
              : {
                  color: '#111827',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }
          }
        >
          {body}
        </Typography>

        {tags.length > 0 && (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" mt={2}>
            {tags.slice(0, 4).map((tag) => (
              <Chip key={tag} label={`#${tag}`} size="small" />
            ))}
          </Stack>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          sx={{
            borderRadius: 999,
            textTransform: 'none',
            backgroundColor: '#6366f1',
          }}
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </Button>

        {url && (
          <Button
            size="small"
            href={url}
            target="_blank"
            rel="noreferrer"
            sx={{ textTransform: 'none' }}
          >
            Open article
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default SinglePost
