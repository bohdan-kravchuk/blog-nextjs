import {createContext} from 'react';
import {IComment, ICommentsState} from './CommentsState';

interface ContextProps {
  state: ICommentsState
  setCommentsState(comments: IComment[]): void
  addCommentToState(comment: IComment): void
}

export const CommentsContext = createContext<Partial<ContextProps>>({})