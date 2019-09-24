import { LOAD_DIRECTORY_CONTENT, TOGGLE_SUBDIRECTORIES } from "../actions/actions";

const initialState = {
  activeId: 0,
  expandedIds: []
}

function directories (state = initialState, action) {
  switch (action.type) {
    case LOAD_DIRECTORY_CONTENT:
      return Object.assign({}, state, {
        activeId: action.payload.directoryId
      })
    case TOGGLE_SUBDIRECTORIES:
      const directoryId = action.payload.directoryId
      const index = state.expandedIds.indexOf(directoryId)
      let expandedIds
      if (index !== -1) {
        expandedIds = state.expandedIds.slice(0, index).concat(state.expandedIds.slice(index + 1))
      } else {
        expandedIds = state.expandedIds.concat(directoryId)
      }
      return Object.assign({}, state, { expandedIds: expandedIds })
    default:
      return state
  }
}

export default directories
