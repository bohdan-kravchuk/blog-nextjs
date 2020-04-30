import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import {Navbar} from './Navbar';
import {Footer} from './Footer'

export const siteTitle = 'Blog'

interface LayoutProps {
  children: React.ReactNode
  post?: boolean
}

export const Layout: React.FC<LayoutProps> = ({children, post}: LayoutProps) => {
  return (
    <Container>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        <meta
          name="description"
          content="Blog description"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle}/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
        <Navbar />
        <MainContainer>
          <main>{children}</main>
          {post && (
            <BackToHome>
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </BackToHome>
          )}
        </MainContainer>
        <Footer />
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  padding-bottom: 24px; /* Height of footer */
  min-height: 100%;
`

const MainContainer = styled.div`
  max-width: 80rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
  font-size: 2rem;
`

const BackToHome = styled.div`
  margin: 3rem 0 0;
`


