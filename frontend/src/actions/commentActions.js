import ReadableApi from '../utils/ReadableApi'
import * as types from './actionTypes';  

export function addCommentSuccess(comment) {
  return {
    type: types.ADD_COMMENT_SUCCESS,
    comment
  };
}

export function addComment(comment) {  
  return function(dispatch) {
    return ReadableApi.addComment(comment).then(addedcomment => {
      dispatch(addCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteCommentSuccess(comment) {
  return {
    type: types.REMOVE_COMMENT_SUCCESS,
    comment
  };
}

export function deleteComment(id) {
  return function(dispatch) {
    return ReadableApi.deleteComment(id).then(comment => {
      dispatch(deleteCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  };
}

export function editCommentSuccess(comment) {
  return {
    type: types.EDIT_COMMENT_SUCCESS,
    comment
  };
}

export function editComment(id,comment) {
  return function(dispatch) {
    return ReadableApi.editComment(id,comment).then(comment => {
      dispatch(editCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  };
}

export function upvoteCommentSuccess(comment) {
  return {
    type: types.VOTE_COMMENT_SUCCESS,
    comment
  };
}

export function upvoteComment(id) {
  return function(dispatch) {
    return ReadableApi.upvoteComment(id).then(comment => {
      dispatch(upvoteCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  };
}

export function downvoteCommentSuccess(comment) {
  return {
    type: types.VOTE_COMMENT_SUCCESS,
    comment
  };
}

export function downvoteComment(id) {
  
  return function(dispatch) {
    return ReadableApi.downvoteComment(id).then(comment => {
      dispatch(downvoteCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadComments() {  
    return function(dispatch) {
      return ReadableApi.fetchAllComments().then(comments => {
        dispatch(fetchAllCommentsSuccess(comments));
      }).catch(error => {
        throw(error);
      });
    };
  }

  export function fetchAllCommentsSuccess(comments) {  
    return {type: types.LOAD_COMMENTS_SUCCESS, comments};
  }

  export function loadSpecificComments(postId) {  
    return function(dispatch) {
      return ReadableApi.fetchSpecificComments(postId).then(comments => {
        dispatch(fetchSpecificCommentsSuccess(comments));
      }).catch(error => {
        throw(error);
      });
    };
  }  

  export function fetchSpecificCommentsSuccess(comments) {  
    return {type: types.LOAD_SPECIFIC_COMMENTS, comments};
  }


  

  
