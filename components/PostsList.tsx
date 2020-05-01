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
      {posts.slice().reverse().map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </ul>
  )
}