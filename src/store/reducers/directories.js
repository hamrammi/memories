import { TOGGLE_SUBDIRECTORIES } from "../actions/actions";

function directories (state = { tree: [], activeDirectoryId: 0 }, action) {
  switch (action.type) {
    case TOGGLE_SUBDIRECTORIES:
      return Object.assign({}, state, {
        activeDirectoryId: action.payload.directoryId
      })

    default:
      return state
  }
}

export default directories
