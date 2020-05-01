import styled from 'styled-components'
import Link from 'next/link';

interface PostCardProps {
  id: number
  title: string
  body: string
}

const truncate = (text, length) => {
  if(!text) return
  
  if (text.length > length) {
    while (text[length - 3] !== ' ') {
      length -= 1
    }
    return text.slice(0, length - 3) + '...'
  } else {
    return text
  }
}

export const PostCard: React.FC<PostCardProps> = ({id, title, body}: PostCardProps) => {
  return (
    <ListItem key={id}>
      <Link href="/posts/[id]" as={`/posts/${id}`}>
        <a>
          <h2>{title}</h2>
          <p>{truncate(body, 200)}</p>
        </a>
      </Link>
    </ListItem>
  )
}

const ListItem = styled.li`
  list-style: none;
  border: 1px solid #eaeaea;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  padding: 1rem 3rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  &:hover {
    background: rgba(245,245,245);
  }
  a {
    color: #15171a;
  }
  h2 {
    font-size: 3rem;
  }
  a:hover {
    text-decoration: none;
  }
`
