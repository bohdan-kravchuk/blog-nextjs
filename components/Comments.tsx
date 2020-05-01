import styled from 'styled-components';
import { useState } from 'react';
import axios from '../axios/axios-blog';

interface CommentsProps {
  comments: {
    id?: number
    postId: number
    body: string
  }[]
  postId: number
}

interface Icomments {
  body: string
  postId: number
}

const createComment = (commentData: Icomments) => {
  const raw = JSON.stringify(commentData)
  axios.post('/comments', raw, {headers: {"Content-Type": "application/json"}})
}


export const Comments = ({comments, postId}: CommentsProps) => {
  const [newComment, setNewComment] = useState<string>('')
  const [addedComments, setAddedComments] = useState<Icomments[]>([])
  
  const newCommentHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value)
  }
  
  const addedCommentsHandler = () => {
    if (newComment.trim()) {
      setAddedComments(prevState => {
        const newArr = prevState.slice();
        newArr.push({body: newComment, postId})
        return newArr
      })
      
      createComment({body: newComment, postId})
      setNewComment('')
    }
  }
  
  const onKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newComment.trim()) {
      setAddedComments(prevState => {
        const newArr = prevState.slice();
        newArr.push({body: newComment, postId})
        return newArr
      })
  
      createComment({body: newComment, postId})
      setNewComment('')
    }
  }
  
  const commentsQuantity = comments.length + addedComments.length
  
  return (
    <CommentSection>
      <CommentCounter>
        {commentsQuantity + (commentsQuantity > 1 ? ' comments' : ' comment')}
      </CommentCounter>
      <Input
        type="text"
        placeholder='Join the discussion...'
        value={newComment}
        onChange={newCommentHandler}
        onKeyDown={onKeyHandler}
      />
      <Right>
        <Button onClick={addedCommentsHandler}>Post</Button>
      </Right>
      {comments.concat(addedComments).reverse().map(comment => (<CommentCard>{comment.body}</CommentCard>))}
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