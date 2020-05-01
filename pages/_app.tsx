import '../styles/global.css';
import {AppProps} from 'next/app'
import {CommentsState} from '../context/comments/CommentsState';

export default function App({Component, pageProps}: AppProps) {
  return (
    <CommentsState>
      <Component {...pageProps} />
    </CommentsState>
  )
}