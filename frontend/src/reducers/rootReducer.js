import {combineReducers} from 'redux';  
import categories from './catReducer';
import posts from './postReducer';
import comments from './commentReducer';

const rootReducer = combineReducers({  
  categories,
  posts,
  comments
})

export default rootReducer; 