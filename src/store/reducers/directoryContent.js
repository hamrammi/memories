import { LOAD_DIRECTORY_CONTENT } from "../actions/actions";

const fakeData = {
  1: [{
    id: 1,
    title: 'Do something',
    description: 'It is a good time to do something',
    addedAt: '2019-09-13 12:23:56'
  }, {
    id: 11,
    title: 'How to feel better',
    description: 'Do yourself a favour',
    addedAt: '2019-09-19 22:12:34'
  }],
  3: [{
    id: 3,
    title: 'Title 3',
    description: 'It is a good time to do something',
    addedAt: '2019-09-13 12:23:56'
  }],
  4: [{
    id: 4,
    title: 'Title 4',
    description: 'It is a good time to do something',
    addedAt: '2019-09-13 12:23:56'
  }, {
    id: 41,
    title: 'How to feel better',
    description: 'Do yourself a favour',
    addedAt: '2019-09-19 22:12:34'
  }],
  5: [{
    id: 5,
    title: 'title 5',
    description: 'It is a good time to do something',
    addedAt: '2019-09-13 12:23:56'
  }],
  7: [{
    id: 7,
    title: 'title 777',
    description: 'It is a good time to do something',
    addedAt: '2019-09-13 12:23:56'
  }]
}

function directoryContent (state = {}, action) {
  switch (action.type) {
    case LOAD_DIRECTORY_CONTENT:
      const directoryId = action.payload.directoryId
      return Object.assign({}, state, {
        [directoryId]: fakeData[directoryId] || []
      })

    default:
      return state
  }
}

export default directoryContent
