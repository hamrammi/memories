
// ~~~~ FOLDER ~~~~

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

// ~~~~ MEMORY ~~~~

export const SELECT_MEMORY = 'SELECT_MEMORY'

export const selectMemory = (memoryId) => ({
  type: SELECT_MEMORY,
  payload: { memoryId }
})

// ~~~~ NOTIFIER ~~~~

export const SHOW_NOTIFIER = 'SHOW_NOTIFIER'
export const HIDE_NOTIFIER = 'HIDE_NOTIFIER'

export function showNotifier (type, message = '') {
  return {
    type: SHOW_NOTIFIER,
    payload: { type, message }
  }
}

export function hideNotifier (type = '__all__') {
  return {
    type: HIDE_NOTIFIER,
    payload: { type }
  }
}
