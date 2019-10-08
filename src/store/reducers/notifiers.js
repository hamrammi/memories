import { TOGGLE_NOTIFIER } from '../actions/actions'

const initialState = {
  success: '',
  error: '',
  warning: '',
  info: ''
}

export default function notifiers (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NOTIFIER:
      return Object.assign({}, state, {
        [action.payload.type]: action.payload.message
      })
    default:
      return state
  }
}
