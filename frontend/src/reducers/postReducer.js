import * as types from "../actions/actionTypes";

export default function postReducer(state = {}, action) {
  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS:
      return action.posts;
    case types.LOAD_SPECIFIC_POSTS_SUCCESS:
      return action.posts;
    case types.ADD_POST_SUCCESS:
      return [
        ...state,
        {
          id: action.post.id,
          timestamp: action.post.timestamp,
          title: action.post.title,
          body: action.post.body,
          author: action.post.author,
          category: action.post.category,
          voteScore: 0,
          deleted: false
        }
      ];
    case types.REMOVE_POST_SUCCESS:
      return state.map(post => {
        if (post.id === action.post.id) {
          return Object.assign({}, post, {
            deleted: true
          });
        }
        return post;
      });
    case types.VOTE_POST_SUCCESS:
      return state.map(post => {
        if (post.id === action.post.id) {
          return Object.assign({}, post, {
            voteScore: action.post.voteScore
          });
        }
        return post;
      });
    case types.EDIT_POST_SUCCESS:
      return state.map(post => {
        if (post.id === action.post.id) {
          return Object.assign({}, post);
        }
        return post;
      });
    default:
      return state;
  }
}
