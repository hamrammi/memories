export const TOGGLE_SUBDIRECTORIES = 'TOGGLE_SUBDIRECTORIES'
export const SELECT_DIRECTORY = 'SELECT_DIRECTORY'

export function toggleSubdirectories(directoryId, component) {
  return {
    type: TOGGLE_SUBDIRECTORIES,
    payload: { directoryId },
    meta: { component }
  }
}

export function selectDirectory (directoryId, component) {
  return {
    type: SELECT_DIRECTORY,
    payload: { directoryId },
    meta: { component }
  }
}

export const TOGGLE_NOTIFIER = 'TOGGLE_NOTIFIER'

export function toggleNotifier (type, message = '') {
  return {
    type: TOGGLE_NOTIFIER,
    payload: { type, message }
  }
}
