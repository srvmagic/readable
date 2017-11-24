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
      return [...state.slice(0, action.idx), ...state.slice(action.idx + 1)];
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
      return action.post;
    case types.FETCH_A_POST_SUCCESS:
      return action.post;
    case types.SORT_SCORE_ASC_SUCCESS:
      const sortScoreAsc = key => (a, b) => a[key] > b[key];
      return state.slice().sort(sortScoreAsc("voteScore"));
    case types.SORT_SCORE_DESC_SUCCESS:
      const sortScoreDesc = key => (a, b) => a[key] < b[key];
      return state.slice().sort(sortScoreDesc("voteScore"));
    case types.SORT_TIME_ASC_SUCCESS:
      const sortTimeAsc = key => (a, b) => a[key] > b[key];
      return state.slice().sort(sortTimeAsc("timestamp"));
    case types.SORT_TIME_DESC_SUCCESS:
      const sortTimeDesc = key => (a, b) => a[key] < b[key];
      return state.slice().sort(sortTimeDesc("timestamp"));
    default:
      return state;
  }
}
