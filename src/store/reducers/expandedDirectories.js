import { TOGGLE_SUBDIRECTORIES } from "../actions/actions";

function expandedDirectories (state = [], action) {
  switch (action.type) {
    case TOGGLE_SUBDIRECTORIES:
      const directoryId = action.payload.directoryId
      const index = state.indexOf(directoryId)
      if (index !== -1) {
        return state.slice(0, index).concat(state.slice(index + 1))
      }
      return state.concat(directoryId)
    default:
      return state
  }
}

export default expandedDirectories
