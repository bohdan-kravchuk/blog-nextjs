import {ADD_COMMENT, SET_COMMENTS} from '../types';

const handlers = {
  [SET_COMMENTS]: (state, {payload}) => ({...state, comments: payload}),
  [ADD_COMMENT]: (state, {payload}) => {
    const newArr = state.comments.slice()
    payload.id = state.comments[state.comments.length - 1].id + 1
    newArr.push(payload)
    return {...state, comments: newArr}
  },
  DEFAULT: state => state
}

export const commentsReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  
  return handler(state, action)
}