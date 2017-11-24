import ReadableApi from "../utils/ReadableApi";
import * as types from "./actionTypes";

export function addPostSuccess(post) {
  return {
    type: types.ADD_POST_SUCCESS,
    post
  };
}

export function addPost(post) {
  return function(dispatch) {
    return ReadableApi.addPost(post)
      .then(addedpost => {
        dispatch(addPostSuccess(post));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deletePostSuccess(idx) {
  return {
    type: types.REMOVE_POST_SUCCESS,
    idx
  };
}

export function deletePost(id, idx) {
  return function(dispatch) {
    return ReadableApi.deletePost(id)
      .then(post => {
        dispatch(deletePostSuccess(idx));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function editPostSuccess(post) {
  
  return {
    type: types.EDIT_POST_SUCCESS,
    post
  };
}

export function editPost(id, opost) {
  return function(dispatch) {
    return ReadableApi.editPost(id, opost)
      .then(opost => {
        dispatch(editPostSuccess(opost));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function upvotePostSuccess(post) {
  console.log(post)
  return {
    type: types.VOTE_POST_SUCCESS,
    post
  };
}

export function upvotePost(id) {
  return function(dispatch) {
    return ReadableApi.upvotePost(id)
      .then(post => {
        dispatch(upvotePostSuccess(post));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function downvotePostSuccess(post) {
  return {
    type: types.VOTE_POST_SUCCESS,
    post
  };
}

export function downvotePost(id) {
  return function(dispatch) {
    return ReadableApi.downvotePost(id)
      .then(post => {
        dispatch(downvotePostSuccess(post));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function loadPosts() {
  return function(dispatch) {
    return ReadableApi.fetchAllPosts()
      .then(posts => {
        dispatch(fetchAllPostsSuccess(posts));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function fetchAllPostsSuccess(posts) {
  return { type: types.LOAD_POSTS_SUCCESS, posts };
}

export function loadSpecificPosts(category) {
  return function(dispatch) {
    return ReadableApi.fetchSpecificPosts(category)
      .then(posts => {
        dispatch(fetchSpecificPostsSuccess(posts));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function fetchAPostSuccess(post) {
  return { type: types.FETCH_A_POST_SUCCESS, post };
}

export function fetchAPost(id) {
  return function(dispatch) {
    return ReadableApi.fetchPost(id)
      .then(post => {
        dispatch(fetchAPostSuccess(post));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function fetchSpecificPostsSuccess(posts) {
  return { type: types.LOAD_SPECIFIC_POSTS_SUCCESS, posts };
}

export function sortScoreAsc(posts){
  return { type: types.SORT_SCORE_ASC_SUCCESS, posts };
}
export function sortScoreDesc(posts){
  return { type: types.SORT_SCORE_DESC_SUCCESS, posts };
}

export function sortTimeAsc(posts){
  return { type: types.SORT_TIME_ASC_SUCCESS, posts };
}
export function sortTimeDesc(posts){
  return { type: types.SORT_TIME_DESC_SUCCESS, posts };
}