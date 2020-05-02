import {Layout} from '../../components/Layout'
import Head from 'next/head'
import {GetServerSideProps} from 'next'
import styled from 'styled-components'
import axios from '../../axios/axios-blog';
import Link from 'next/link';
import {Comments} from '../../components/Comments';

export interface PostProps {
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
    <Layout>
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
      <Comments postId={post.id} comments={post.comments}/>
    </Layout>
  )
}

export default Post

export const getServerSideProps: GetServerSideProps = async ({params}) => {
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

