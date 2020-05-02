import {PostCard} from './PostCard';
import styled from 'styled-components';

interface PostsListProps {
  posts: {
    id: number
    title: string
    body: string
  }[]
}

export const PostsList: React.FC<PostsListProps> = ({posts}: PostsListProps) => {
  return (
    <List>
      {posts.slice().reverse().map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </List>
  )
}

const List = styled.ul`
  padding: 0;
`