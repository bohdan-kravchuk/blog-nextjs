import {CommentsContext} from './CommentsContext';
import {commentsReducer} from './commentsReducer';
import {useReducer} from 'react';
import {ADD_COMMENT, SET_COMMENTS} from '../types';

export interface IComment {
  id?: number
  postId: number
  body: string
}

export interface ICommentsState {
  comments: IComment[]
}

export const CommentsState: React.FC = ({children}) => {
  const initialState: ICommentsState = {
    comments: []
  }
  
  const [state, dispatch] = useReducer(commentsReducer, initialState)
  
  const setCommentsState = (comments: IComment[] )=> {
    dispatch({type: SET_COMMENTS, payload: comments})
  }
  
  const addCommentToState = (comment: IComment) => {
    dispatch({type: ADD_COMMENT, payload: comment})
  }
 
  return (
    <CommentsContext.Provider value={{state, setCommentsState, addCommentToState}}>
      {children}
    </CommentsContext.Provider>
  )
}