import { combineReducers } from "redux";
import directories from "./directories";
import notifiers from './notifiers'
import memoriesReducer from "./memories";

export default combineReducers({
  directories,
  notifiers,
  memories: memoriesReducer
})
