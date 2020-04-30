import {Layout} from '../../components/Layout'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths} from 'next'
import styled from 'styled-components'
import axios from '../../axios/axios-blog';


const Post = ({post}) => {
  return (
    <Layout post>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Article>
        <PostTitle>{post.title}</PostTitle>
        <p>{post.body}</p>
        <Input type="text" placeholder='Join the discussion...'/>
      </Article>
    </Layout>
  )
}

export default Post

const Article = styled.article`
  font-size: 2rem;
`

const PostTitle = styled.h1`
  font-size: 5rem;
`

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  border: 2px solid lightgray;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px #000ac8;
    border-radius: 5px;
  }
`

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