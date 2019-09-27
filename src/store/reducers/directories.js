import { SELECT_DIRECTORY, TOGGLE_SUBDIRECTORIES } from "../actions/actions";

const initialState = {
  SearchMemories__activeId: 0,
  SearchMemories__expandedIds: [],
  AddMemory__expandedIds: [],
  AddMemory__activeId: 0
}

function directories (state = initialState, action) {
  let stateKey = ''
  switch (action.type) {
    case SELECT_DIRECTORY:
      stateKey = `${action.meta.component}__activeId`
      return Object.assign({}, state, {
        [stateKey]: action.payload.directoryId
      })
    case TOGGLE_SUBDIRECTORIES:
      const directoryId = action.payload.directoryId
      stateKey = `${action.meta.component}__expandedIds`
      const oldState = state[stateKey]
      const index = oldState.indexOf(directoryId)
      let expandedIds = []
      if (index !== -1) {
        expandedIds = oldState.slice(0, index).concat(oldState.slice(index + 1))
      } else {
        expandedIds = oldState.concat(directoryId)
      }
      return Object.assign({}, state, { [stateKey]: expandedIds })
    default:
      return state
  }
}

export default directories
