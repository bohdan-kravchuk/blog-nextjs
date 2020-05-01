import {createContext} from 'react';
import {IComment, ICommentsState} from './CommentsState';

interface ContextProps {
  state: ICommentsState
  getComments(postId: number): void
  addComment(comment: IComment): void
}

export const CommentsContext = createContext<Partial<ContextProps>>({})