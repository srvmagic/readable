import root from "../reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'


export default function configureStore() {
  return createStore(root, applyMiddleware(thunk,logger));
}
