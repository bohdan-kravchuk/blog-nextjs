import Head from 'next/head'
import { Layout, siteTitle } from '../components/Layout'
import { GetStaticProps } from 'next'
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
      <section>
        <PostsList posts={posts}/>
      </section>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get('/posts')
  const posts = response.data
  return {
    props: {
      posts
    }
  }
}