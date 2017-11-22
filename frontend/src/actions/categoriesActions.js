import ReadableApi from "../utils/ReadableApi";
import * as types from "./actionTypes";

export function loadCategoriesSuccess(categories) {
  return {
    type: types.LOAD_CATEGORIES_SUCCESS,
    categories
  };
}


export function loadCategories() {  
 
  return function(dispatch) {
    return ReadableApi.fetchCategories().then(cats => {
      dispatch(loadCategoriesSuccess(cats));
    }).catch(error => {
      throw(error);
    });
  };
}