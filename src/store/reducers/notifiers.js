import { SHOW_NOTIFIER, HIDE_NOTIFIER } from '../actions/actions'

const initialState = {
  success: '',
  error: '',
  warning: '',
  info: ''
}

export default function notifiers (state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFIER:
      return Object.assign({}, state, {
        [action.payload.type]: action.payload.message
      })
    case HIDE_NOTIFIER:
      if (action.payload.type === '__all__') {
        return initialState
      }
      return Object.assign({}, state, {
        [action.payload.type]: ''
      })
    default:
      return state
  }
}
