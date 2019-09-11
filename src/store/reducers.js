import { combineReducers } from "redux";
import { TOGGLE_SUBDIRS } from "./actions";

const TODO_directories = [
  {
    id: 1,
    name: 'React',
    subDirectories: [
      {
        id: 4,
        name: 'Redux',
        subDirectories: [
          {
            id: 7,
            name: 'Plain',
            subDirectories: []
          }
        ]
      },
      {
        id: 5,
        name: 'React Router',
        subDirectories: []
      }
    ]
  },
  {
    id: 2,
    name: 'Vue',
    subDirectories: [
      {
        id: 6,
        name: 'Vuex',
        subDirectories: []
      }
    ]
  },
  {
    id: 3,
    name: 'Angular',
    subDirectories: []
  }
]

function directories (state = TODO_directories, action) {
  return state
}

function expandedDirectories (state = [], action) {
  switch (action.type) {
    case TOGGLE_SUBDIRS:
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

export default combineReducers({
  expandedDirectories,
  directories
})
