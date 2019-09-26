import { ADD_MEMORY__MARK_DIRECTORY_AS_ACTIVE, SEARCH_MEMORIES__LOAD_DIRECTORY_CONTENT, TOGGLE_SUBDIRECTORIES } from "../actions/actions";

const initialState = {
  SearchMemories__activeId: 0,
  SearchMemories__expandedIds: [],
  AddMemory__expandedIds: [],
  AddMemory__activeId: 0
}

function directories (state = initialState, action) {
  switch (action.type) {
    case SEARCH_MEMORIES__LOAD_DIRECTORY_CONTENT:
      return Object.assign({}, state, {
        SearchMemories__activeId: action.payload.directoryId
      })
    case TOGGLE_SUBDIRECTORIES:
      const directoryId = action.payload.directoryId
      const stateKey = `${action.meta.component}__expandedIds`
      const oldState = state[stateKey]
      const index = oldState.indexOf(directoryId)
      let expandedIds = []
      if (index !== -1) {
        expandedIds = oldState.slice(0, index).concat(oldState.slice(index + 1))
      } else {
        expandedIds = oldState.concat(directoryId)
      }
      return Object.assign({}, state, { [stateKey]: expandedIds })
    case ADD_MEMORY__MARK_DIRECTORY_AS_ACTIVE:
      return Object.assign({}, state, {
        AddMemory__activeId: action.payload.directoryId
      })
    default:
      return state
  }
}

export default directories
