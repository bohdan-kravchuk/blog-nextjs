import styled, {keyframes} from 'styled-components';
import {useState, useContext} from 'react';
import axios from '../axios/axios-blog';
import {CommentsContext} from '../context/comments/CommentsContext';

interface IComment {
  id?: number
  postId: number
  body: string
}

interface CommentsProps {
  postId: number
  comments: IComment[]
}

const createComment = (commentData: IComment) => {
  const raw = JSON.stringify(commentData)
  axios.post('/comments', raw, {headers: {"Content-Type": "application/json"}})
}

export const Comments: React.FC<CommentsProps> = ({postId, comments}: CommentsProps) => {
  const [newComment, setNewComment] = useState<string>('')
  const {setCommentsState, state, addCommentToState} = useContext(CommentsContext)
 
  const newCommentHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value)
  }
  
  const addCommentHandler = () => {
    if (newComment.trim()) {
      if (!state.comments.length) {
        setCommentsState(comments)
      }
      addCommentToState({body: newComment, postId})
      createComment({body: newComment, postId})
      setNewComment('')
    }
  }
  
  const onKeyCommentHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newComment.trim()) {
      if (!state.comments.length) {
        setCommentsState(comments)
      }
      addCommentToState({body: newComment, postId})
      createComment({body: newComment, postId})
      setNewComment('')
    }
  }
  
  const allComments = state.comments.length ? state.comments : comments

  return (
    <CommentSection>
      <CommentCounter>
        {allComments.length + (allComments.length > 1 ? ' comments' : ' comment')}
      </CommentCounter>
      <Input
        type="text"
        placeholder='Join the discussion...'
        value={newComment}
        onChange={newCommentHandler}
        onKeyDown={onKeyCommentHandler}
      />
      <Right>
        <Button onClick={addCommentHandler}>Post</Button>
      </Right>
      {allComments.slice().reverse().map(comment => (
        <CommentCard key={comment.id}>{comment.body}</CommentCard>
      ))}
    </CommentSection>
  )
}

const CommentSection = styled.section`
  margin-top: 3rem;
`

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 2px solid lightgray;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px #000ac8;
    border-radius: 5px;
  }
`

const Button = styled.button`
    border-radius: 5px;
    padding: 1rem 3rem;
    cursor: pointer;
    background: #26a69a;
    text-align: center;
    outline: 0;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    border: none;
    color: white;
    text-transform: uppercase;
    margin-bottom: 2rem;
`

const Right = styled.div`
  text-align: right;
`

const CommentCounter = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  border-bottom: 2px solid darkgray;
  line-height: 3rem;
`

const CommentCard = styled.div`
  padding: 2rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 1.6rem;
`

const Center = styled.div`
  text-align: center;
`

const ldsRoller = keyframes`
    0% {
      transform: rotate(0deg);
  }
    100% {
      transform: rotate(360deg);
  }
`

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    animation: ${ldsRoller} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #616161;
  margin: -4px 0 0 -4px;
}
  div:nth-child(1) {
    animation-delay: -0.036s;
  }
  div:nth-child(1):after {
    top: 63px;
    left: 63px;
  }
  div:nth-child(2) {
    animation-delay: -0.072s;
  }
  div:nth-child(2):after {
    top: 68px;
    left: 56px;
  }
  div:nth-child(3) {
    animation-delay: -0.108s;
  }
  div:nth-child(3):after {
    top: 71px;
    left: 48px;
  }
  div:nth-child(4) {
    animation-delay: -0.144s;
  }
  div:nth-child(4):after {
    top: 72px;
    left: 40px;
  }
  div:nth-child(5) {
    animation-delay: -0.18s;
  }
  div:nth-child(5):after {
    top: 71px;
    left: 32px;
  }
  div:nth-child(6) {
    animation-delay: -0.216s;
  }
  div:nth-child(6):after {
    top: 68px;
    left: 24px;
  }
  div:nth-child(7) {
    animation-delay: -0.252s;
  }
  div:nth-child(7):after {
    top: 63px;
    left: 17px;
  }
  div:nth-child(8) {
    animation-delay: -0.288s;
  }
  div:nth-child(8):after {
    top: 56px;
    left: 12px;
  }
`

