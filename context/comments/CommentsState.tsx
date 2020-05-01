import {CommentsContext} from './CommentsContext';
import {commentsReducer} from './commentsReducer';
import {useReducer} from 'react';
import axios from '../../axios/axios-blog';
import {ADD_COMMENT, GET_COMMENTS, SET_LOADING} from '../types';

export interface IComment {
  id?: number
  postId: number
  body: string
}

export interface ICommentsState {
  comments: IComment[]
  loading: boolean
}

export const CommentsState = ({children}) => {
  const initialState: ICommentsState = {
    comments: [],
    loading: false
  }
  
  const [state, dispatch] = useReducer(commentsReducer, initialState)
  
  const getComments = async (postId: number) => {
    dispatch({type: SET_LOADING})
    const response = await axios.get(`/posts/${postId}?_embed=comments`)
    const comments = response.data.comments
    dispatch({type: GET_COMMENTS, payload: comments})
  }
  
  const addComment = (comment: IComment) => {
    const newComment = state.comments.slice()
    newComment.push(comment)
    dispatch({type: ADD_COMMENT, payload: newComment})
  }
  
 
  return (
    <CommentsContext.Provider value={{state, getComments, addComment}}>
      {children}
    </CommentsContext.Provider>
  )
}