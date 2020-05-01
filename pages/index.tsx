import Head from 'next/head'
import { Layout, siteTitle } from '../components/Layout'
import { GetServerSideProps } from 'next'
import {PostsList} from '../components/PostsList';
import axios from '../axios/axios-blog';

interface HomeProps {
  posts: {
    id: number
    title: string
    body: string
  }[]
}

const Home: React.FC<HomeProps> = ({posts}: HomeProps) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <PostsList posts={posts} />
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get('/posts')
  const posts = response.data
  return {
    props: {
      posts
    }
  }
}