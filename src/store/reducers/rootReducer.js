import { combineReducers } from "redux";
import expandedDirectories from "./expandedDirectories";
import directories from "./directories";
import directoryContent from "./directoryContent";

export default combineReducers({
  expandedDirectories,
  directories,
  directoryContent
})
