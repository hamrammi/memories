import { SELECT_MEMORY } from "../actions/actions";

const initialState = {
  activeId: ''
}

function memoriesReducer (state = initialState, action) {
  switch (action.type) {
    case SELECT_MEMORY:
      return Object.assign({}, state, {
        activeId: action.payload.memoryId
      })
    default:
      return state
  }
}

export default memoriesReducer
