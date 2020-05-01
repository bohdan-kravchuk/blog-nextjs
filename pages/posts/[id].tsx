import {Layout} from '../../components/Layout'
import Head from 'next/head'
import {GetStaticProps, GetStaticPaths} from 'next'
import styled from 'styled-components'
import axios from '../../axios/axios-blog';
import Link from 'next/link';
import {Comments} from '../../components/Comments';

interface PostProps {
  post: {
    title: string
    id: number
    body: string
    comments: {
      id: number
      postId: number
      body: string
    }[]
  }
}

const Post = ({post}: PostProps) => {
  return (
    <Layout post>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Article>
        <PostTitle>{post.title}</PostTitle>
        <p>{post.body}</p>
        <BackToHome>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </BackToHome>
      </Article>
      <Comments postId={post.id}/>
    </Layout>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('/posts')
  const paths = response.data.map(post => ({params: {id: `${post.id}`}}))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const response = await axios.get(`/posts/${params.id}?_embed=comments`)
  const post = response.data
  return {
    props: {
      post
    }
  }
}

const Article = styled.article`
  font-size: 2rem;
`

const PostTitle = styled.h1`
  font-size: 5rem;
`

const BackToHome = styled.div`
  margin: 3rem 0 0;
`

