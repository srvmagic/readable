import * as types from "../actions/actionTypes";

export default function commentReducer(state = {}, action) {
  switch (action.type) {
    case types.LOAD_SPECIFIC_COMMENTS:
      return action.comments;
    case types.ADD_COMMENT_SUCCESS:
      return [
        ...state,
        {
          id: action.comment.id,
          parentId:action.comment.parentId,
          timestamp: action.comment.timestamp,
          title: action.comment.title,
          body: action.comment.body,
          author: action.comment.author,
          voteScore: 1,
          deleted: false,
          parentDeleted: false
          
        }
      ];
    case types.REMOVE_COMMENT_SUCCESS:
    return [
      ...state.slice(0,action.idx),
      ...state.slice(action.idx + 1)
      ]  
    case types.VOTE_COMMENT_SUCCESS:
      return state.map(comment => {
        if (comment.id === action.comment.id) {
          return Object.assign({}, comment, {
            voteScore: action.comment.voteScore
          });
        }
        return comment;
      });
    case types.EDIT_COMMENT_SUCCESS:
      return state.map(comment => {
        if (comment.id === action.comment.id) {
          return Object.assign({}, comment);
        }
        return comment;
      });
    default:
      return state;
  }
}
