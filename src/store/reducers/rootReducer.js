import { combineReducers } from "redux";
import directories from "./directories";
import notifiers from './notifiers'

export default combineReducers({
  directories,
  notifiers
})
