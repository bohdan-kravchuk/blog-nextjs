import Head from 'next/head'
import styled from 'styled-components'
import {Navbar} from './Navbar';
import {Footer} from './Footer'

export const siteTitle = 'Blog'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({children}: LayoutProps) => {
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
        </MainContainer>
        <Footer />
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  padding-bottom: 114px;
  min-height: 100%;
`

const MainContainer = styled.div`
  max-width: 80rem;
  padding: 0 1rem;
  margin: 5rem auto 0;
  font-size: 2rem;
`




