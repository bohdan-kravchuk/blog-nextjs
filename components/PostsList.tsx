import styled from 'styled-components'
import Link from 'next/link';
import {PostCard} from './PostCard';

interface PostsListProps {
  posts: {
    id: number
    title: string
    body: string
  }[]
}

export const PostsList: React.FC<PostsListProps> = ({posts}: PostsListProps) => {
  return (
    <ul>
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </ul>
  )
}