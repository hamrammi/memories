import { TOGGLE_SUBDIRECTORIES } from "../actions/actions";

const tree = [
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

function directories (state = { tree, activeDirectoryId: 0 }, action) {
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
