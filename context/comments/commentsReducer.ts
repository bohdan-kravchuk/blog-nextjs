import {ADD_COMMENT, GET_COMMENTS, SET_LOADING} from '../types';


const handlers = {
  [GET_COMMENTS]: (state, {payload}) => ({...state, comments: payload, loading: false}),
  [SET_LOADING]: state => ({...state, loading: true}),
  [ADD_COMMENT]: (state, {payload}) => ({...state, comments: payload}),
  DEFAULT: state => state
}

export const commentsReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  
  return handler(state, action)
}